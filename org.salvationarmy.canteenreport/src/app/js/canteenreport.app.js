(function( global, undefined ) {

  var slice = [].slice,
    subscriptions = {};

  var canteenreport = global.canteenreport = {

  	debug: true,

    // save some constants
    BACKUP_STORE_NAME: 'canteenReportBackupStore',
    ACTIVE_REPORT_STORE_NAME: 'canteenReportActiveStore',
    HOME_SCREEN: 'home',
    INPUT_SCREEN: 'form',

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

      // canteen report event subscriptions
      canteenreport.subscribe('form-focused', $.proxy(this.formFocused, this));

      this.listUnsubmittedReports();

  	},

    /**
     * lists the forms that ahve been saved to local storage
     */
    listUnsubmittedReports: function () {

      console.group('listUnsubmittedReports');

      var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
      var $savedFormsList = $('#js-saved-reports').empty();

      console.log(formBackupStore);

      if (formBackupStore != undefined) {

        $.each(formBackupStore, function (index, value) {
          var id = value[0].value;
          $savedFormsList.append('<a class="js-open-saved-form-btn date glyphicon glyphicon-chevron-right" data-id="' + id + '">' + id + '</a>');
        });

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
      canteenreport.form.openReport(report);

      this.changeScreen(this.INPUT_SCREEN);

      console.groupEnd();

      return false;

    },

    /***
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