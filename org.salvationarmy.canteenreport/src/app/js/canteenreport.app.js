(function( global, undefined ) {

  var slice = [].slice,
    subscriptions = {};

  var canteenreport = global.canteenreport = {

  	debug: true,

    // save some constants
    BACKUP_STORE_NAME: 'canteenReportBackupStore',
    ACTIVE_REPORT_STORE_NAME: 'canteenReportActiveStore',
    REPORT_REQUEST_NAME: 'canteenreportRequest',
    HOME_SCREEN: 'home',
    INPUT_SCREEN: 'form',

    FORM_SUBMIT_MESSAGE: 'Ready to submit? Please check all fields before submitting.',
    FORM_SUBMITTED_MESSAGE: 'Your report has been submitted.',
    FORM_ERROR_MESSAGE: 'There was an error submitting your report. Are you connected to the Internet?',
    FORM_FIELDS_ERROR_MESSAGE: 'You have errors in your form. Please make sure all required fields are filled out.',

  	isOnline: false,
    isSyncing: false,

    //form: null,

    // cached selectors
    $body: null,
    $newReportButton: null,
    $syncBtn: null,
    $closeBtn: null,
    $leftMenu: null,
    $leftMenuItems: null,

  	initialize: function() {

      console.info('app.initialize');

      this.$body = $('body');

      // setup bootstrap's scrollSpy
      this.$body.scrollspy(
        {
          target: '#left-menu',
          offset: 170
        }
      );

      // listens for Cordova's onDeviceReady event
      document.addEventListener('deviceready', this.onDeviceReady, false);

      // watch for on and offline notifications
      window.addEventListener('offline', this.goOffline);
  		window.addEventListener('online', this.goOnline);

      // setup the left menu
      this.$leftMenu = $('#left-menu');
      this.$leftMenuItems = this.$leftMenu.find('a').on('touchend', $.proxy(this.scrollToSection, this));

      // on touchend this creates a new report
      this.$newReportButton = $('#new-report-button').on('touchend', $.proxy(this.newReport, this));

      // closes an open report
      this.$closeBtn = $('#btn-close').on('touchend', $.proxy(this.closeReport, this));

      // syncs the report
      this.$syncBtn = $('#btn-sync').on('touchend', $.proxy(this.saveReport, this));

      // subscribe to amplify events
      amplify.subscribe('report-saved', $.proxy(this.reportSaved, this));

      amplify.subscribe('request.success', function (settings, data, status) {
        console.group('request.success');
        console.info(settings);
        console.info(data);
        console.info(status);
        console.groupEnd();
      } );

      amplify.subscribe('request.error', function (settings, data, status) {
        console.group('request.error');
        console.info(settings);
        console.info(data);
        console.info(status);
        console.groupEnd();
      } );

      //
      // Canteen report subscriptions
      //

      // subscribe to the submit report event
      canteenreport.subscribe('submit-report', $.proxy(this.submitReport, this));

      //
      canteenreport.subscribe('report-submitted', $.proxy(this.reportSubmitted, this));

      canteenreport.subscribe('report-deleted', $.proxy(this.reportDeleted, this));

      // canteen report event subscriptions
      canteenreport.subscribe('form-focused', $.proxy(this.formFocused, this));

      //
      // go
      //
      this.listUnsubmittedReports();

  	},

    /**
     * lists the forms that ahve been saved to local storage
     */
    listUnsubmittedReports: function () {

      console.group('listUnsubmittedReports');

      var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
      var $savedForms = $('#js-saved-reports');
      var $savedFormsList = $('#js-saved-reports-list').empty();

      console.log(formBackupStore);

      if (formBackupStore != undefined && formBackupStore.length > 0) {

        $savedForms.slideDown({
          duration: 900,
          easing: 'easeInOutQuint'
        });

        $.each(formBackupStore, function (index, value) {

          if (value[0]) {
            var id = value[0].value;
            $savedFormsList.append('<a class="js-open-saved-form-btn open-saved-report-btn date glyphicon glyphicon-chevron-right" data-id="' + id + '">' + id + '</a>');
          }

        });

      } else {

        $savedFormsList.append('<p>Your unsubmitted reports will appear here.</p>');

      }

      $('.js-open-saved-form-btn').on('click', $.proxy(this.openReport, this));

      console.groupEnd();

    },

    /**
     * Creates a new Canteen Report
     */
    newReport: function () {

      var newReportId = new Date().getTime();

      this.changeScreen(this.INPUT_SCREEN);

      canteenreport.storage.newReport();
      canteenreport.form.newReport(newReportId);

    },


    openReport: function (event) {

      var id = $(event.currentTarget).data().id;

      console.group('openReport');
      console.log('id: ' + id);

      var report = canteenreport.storage.findBackupFormById(id);

      console.log(report);
      canteenreport.form.openReport(report);

      this.changeScreen(this.INPUT_SCREEN);

      console.groupEnd();

      return false;

    },

    /**
     * Closes the current form.
     */
    closeReport: function () {

      console.group('closeReport');

      var confirmation = window.confirm('This report will be saved for you to edit later.');

      if (confirmation === true) {
        canteenreport.storage.saveReport();
      }

      this.$leftMenuItems.parent().removeClass("isActive").end().filter("[href=#incident]").parent().addClass("isActive");

      this.listUnsubmittedReports();
      this.changeScreen(this.HOME_SCREEN);

      console.groupEnd();

    },

    reportDeleted: function () {

      this.$leftMenuItems.parent().removeClass("isActive").end().filter("[href=#incident]").parent().addClass("isActive");

      this.listUnsubmittedReports();
      this.changeScreen(this.HOME_SCREEN);

    },

    /**
     * The form was valid and ready to be submitted
     */
    submitReport: function () {

      canteenreport.storage.submitReport();

    },


    /**
     */
    reportSubmitted: function () {

      console.log('reportSubmitted');

    },


    /**
     * Callback for the form focus listener. Assigned in initialize.
     */
    formFocused: function () {

      canteenreport.saveReport();

    },


    /**
     * Save function for the app. Called from formFocused and from $syncBtn.
     */
    saveReport: function () {

      this.isSyncing = true;
      this.$body.addClass('is-syncing');

      canteenreport.storage.syncReport();

    },

    /**
     * Callback from Amplify
     */
    reportSaved: function () {

      console.info('reportSaved');

      this.isSyncing = false;

      var scope = canteenreport;

      // this allows the sync animation to run its course before stopping
      setTimeout(function(){
        if (!canteenreport.isSyncing) {
          canteenreport.$body.removeClass('is-syncing');
          canteenreport.publish('report-saved');
        }
      }, 3000);

    },

    /**
     */
    changeScreen: function (screen) {

      switch (screen) {

        case this.INPUT_SCREEN : {

          $('#start').hide();
          $('#app').show();

          break;
        }

        default : {
          $('#start').show();
          $('#app').hide();
        }

      }

    },

    /**
     * deviceready Event Handler
     *
     * The scope of 'this' is the event. In order to call the 'receivedEvent'
     * function, we must explicity call 'app.receivedEvent(...);'
     */
    onDeviceReady: function() {

     	app.receivedEvent('deviceready');

    },

    goOffline: function () {

  		canteenreport.publish('app-offline');

  	},

  	goOnline: function () {

  		canteenreport.publish('app-online');

  	},

    /**
     * publish, subscribe, and unsubscribe borowed from amplify.core
     */
    publish: function( topic ) {
      if ( typeof topic !== "string" ) {
        throw new Error( "You must provide a valid topic to publish." );
      }
      var args = slice.call( arguments, 1 ),
        topicSubscriptions,
        subscription,
        length,
        i = 0,
        ret;
      if ( !subscriptions[ topic ] ) {
        return true;
      }
      topicSubscriptions = subscriptions[ topic ].slice();
      for ( length = topicSubscriptions.length; i < length; i++ ) {
        subscription = topicSubscriptions[ i ];
        ret = subscription.callback.apply( subscription.context, args );
        if ( ret === false ) {
          break;
        }
      }
      return ret !== false;
    },
    subscribe: function( topic, context, callback, priority ) {
      if ( typeof topic !== "string" ) {
        throw new Error( "You must provide a valid topic to create a subscription." );
      }
      if ( arguments.length === 3 && typeof callback === "number" ) {
        priority = callback;
        callback = context;
        context = null;
      }
      if ( arguments.length === 2 ) {
        callback = context;
        context = null;
      }
      priority = priority || 10;

      var topicIndex = 0,
        topics = topic.split( /\s/ ),
        topicLength = topics.length,
        added;
      for ( ; topicIndex < topicLength; topicIndex++ ) {
        topic = topics[ topicIndex ];
        added = false;
        if ( !subscriptions[ topic ] ) {
          subscriptions[ topic ] = [];
        }

        var i = subscriptions[ topic ].length - 1,
          subscriptionInfo = {
            callback: callback,
            context: context,
            priority: priority
          };

        for ( ; i >= 0; i-- ) {
          if ( subscriptions[ topic ][ i ].priority <= priority ) {
            subscriptions[ topic ].splice( i + 1, 0, subscriptionInfo );
            added = true;
            break;
          }
        }

        if ( !added ) {
          subscriptions[ topic ].unshift( subscriptionInfo );
        }
      }

      return callback;
    },
    unsubscribe: function( topic, context, callback ) {
      if ( typeof topic !== "string" ) {
        throw new Error( "You must provide a valid topic to remove a subscription." );
      }

      if ( arguments.length === 2 ) {
        callback = context;
        context = null;
      }

      if ( !subscriptions[ topic ] ) {
        return;
      }

      var length = subscriptions[ topic ].length,
        i = 0;

      for ( ; i < length; i++ ) {
        if ( subscriptions[ topic ][ i ].callback === callback ) {
          if ( !context || subscriptions[ topic ][ i ].context === context ) {
            subscriptions[ topic ].splice( i, 1 );

            // Adjust counter and length for removed item
            i--;
            length--;
          }
        }
      }
    },

    scrollToSection: function (event) {

      var id = $(event.currentTarget).attr('href');

      if (id.length) {
        $('html, body').animate({
          scrollTop: $(id).offset().top - 70
        });
      }

      event.preventDefault();

    },

    /**
     * Log a message if debug is true
     */
    log: function (message) {

     	if (this.debug) {
     		console.log(message);
     	}

    }

  };

}( this ) );

$(function() {
  canteenreport.initialize();
});