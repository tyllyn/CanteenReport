// $(function() {
//   canteenreport.initialize();
// });

(function (global, undefined) {

  'use strict';

  // var slice = [].slice,
  //   subscriptions = {};

  var canteenreport = global.canteenreport = {

    debug: false,
    screenWidth: screen.width,
    screenHeight: screen.height,

    SAVE_CONFIRM_TITLE: 'Save This Report',
    SAVE_CONFIRM_MESSAGE: 'Save this report to edit later?',

    SUBMIT_CONFIRM_TITLE: 'Your Report Was Saved',
    SUBMIT_CONFIRM_MESSAGE: 'Your report has been submitted. Thank you for your hard work!',

    // save some constants
    // BACKUP_STORE_NAME: 'canteenReportBackupStore',
    // ACTIVE_REPORT_STORE_NAME: 'canteenReportActiveStore',
    REPORT_REQUEST_NAME: 'canteenreportRequest',
    HOME_SCREEN: 'home',
    INPUT_SCREEN: 'form',

    UNSUBMITTED_REPORTS_MESSAGE: 'When you have unsubmitted reports, they will appear here.',

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

  	initialize: function () {

      // position the ui
      this.screenWidth = screen.width;
      this.screenHeight = screen.height;
      $('#container').css('width', this.screenWidth * 2).css('height', this.screenHeight);
      $('#start').css('left', 0).css('width', this.screenWidth).css('height', this.screenHeight);
      $('#app').css('left', this.screenWidth).css('width', this.screenWidth).css('height', this.screenHeight);

      this.$body = $('body');

      // setup bootstrap's scrollSpy
      this.$body.scrollspy(
        {
          target: '#left-menu',
          offset: 170
        }
      );

      // listens for Cordova's onDeviceReady event
      //document.addEventListener('deviceready', this.onDeviceReady, false); // does not render the iPad app

      // watch for on and offline notifications
      window.addEventListener('offline', this.goOffline);
      window.addEventListener('online', this.goOnline);

      this.scrollToSectionById('#form');

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
      //amplify.subscribe('report-saved', $.proxy(this.reportSaved, this));

      //
      // Canteen report subscriptions
      //

      // subscribe to the submit report event
      $.subscribe('submit-report', $.proxy(this.submitReport, this));

      // delete reports
      $.subscribe('delete-report', this.deleteReport)

      // subscribe to the submission confirmation
      $.subscribe('report-submitted', $.proxy(this.reportSubmitted, this));

      // subscribe to report deletion
      $.subscribe('report-deleted', $.proxy(this.reportDeleted, this));

      // canteen report event subscriptions
      $.subscribe('form-focused', $.proxy(this.formFocused, this));

      //
      // set any defaults on the modules
      //
      canteenreport.form.debug = this.debug;


      //
      // go
      //
      this.listUnsubmittedReports();

  	},

    /**
     * lists the forms that ahve been saved to local storage
     */
    listUnsubmittedReports: function () {

      var formBackupStore = canteenreport.storage.getBackedUpReports();
      var $savedForms = $('#js-saved-reports');
      var $savedFormsList = $('#js-saved-reports-list').empty();

      if (formBackupStore != undefined) {

        if (formBackupStore.length > 0) {

          $savedForms.slideDown({
            duration: 900,
            easing: 'easeInOutQuint'
          });

          $.each(formBackupStore, function (index, value) {

            if (value[0]) {
              var id = value[0].value;
              var date = new Date(Number(id));
              var day = date.getDate();
              var year = date.getUTCFullYear();
              var month = date.getMonth();
              var hours = date.getHours();
              var minutes = '0' + date.getMinutes();
              var formattedDate = month + '/' + day + '/' + year + ', ' + hours + ':' + minutes.substr(minutes.length - 2);
              $savedFormsList.append('<a class="js-open-saved-form-btn open-saved-report-btn date glyphicon glyphicon-chevron-right" data-id="' + id + '">' + formattedDate + '</a>');
            }

          });

        } else {

          $savedFormsList.append('<p>' + this.UNSUBMITTED_REPORTS_MESSAGE + '</p>');

        }
      }

      $('.js-open-saved-form-btn').on('click', $.proxy(this.openReport, this));

    },

    /**
     * Creates a new Canteen Report
     */
    newReport: function () {

      console.log('newReport');

      var date = new Date();
      var newReportId = date.getTime();

      canteenreport.storage.newReport();
      canteenreport.form.newReport(newReportId, date);

      this.changeScreen(this.INPUT_SCREEN);

    },


    openReport: function (event) {

      var id = $(event.currentTarget).data().id;

      // console.group('openReport');
      // console.log('id: ' + id);

      var report = canteenreport.storage.findBackupFormById(id);

      //console.log(report);
      canteenreport.form.openReport(report);

      this.changeScreen(this.INPUT_SCREEN);

      //console.groupEnd();

      return false;

    },

    /**
     * Closes the current form.
     */
    closeReport: function () {

      console.log('app.closeReport');

      if (!this.debug) {

        // cordova api call to an os specific confirmation dialog
        navigator.notification.confirm (
          this.SAVE_CONFIRM_MESSAGE,
          $.proxy(this.closeReportOnConfirm, this),
          this.SAVE_CONFIRM_TITLE,
          ['Yes','No']
        );

      } else {

        var confirm = window.confirm(this.SAVE_CONFIRM_TITLE);

        if (confirm === true) {
          this.closeReportOnConfirm(1);
        } else {
          this.closeReportOnConfirm();
        }

      }

    },

    closeReportOnConfirm: function (buttonIndex) {

      console.log('closeReportOnConfirm ' + buttonIndex);

      switch (buttonIndex) {

        case 1 : {
          canteenreport.storage.saveReport();
          this.listUnsubmittedReports();
          this.changeScreen(canteenreport.HOME_SCREEN);
        }
        default : {
          this.changeScreen(canteenreport.HOME_SCREEN);
        }

      }

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
      this.scrollToSectionById('#confirm', 4000, 'easeOutQuad');

    },

    deleteReport: function (event, data) {

      console.log('app.deleteReport');
      canteenreport.storage.deleteReport(data.id);

    },

    /**
     */
    reportSubmitted: function () {

      console.log('reportSubmitted');

      if (!this.debug) {

        // cordova api call to an os specific confirmation dialog
        navigator.notification.confirm (
          this.SUBMIT_CONFIRM_MESSAGE,
          $.proxy(this.reportSubmittedOnConfirm, this),
          this.SUBMIT_CONFIRM_TITLE,
          ['Ok']
        );

      } else {

        var confirm = window.confirm(this.SUBMIT_CONFIRM_TITLE);

        if (confirm === true) {
          this.reportSubmittedOnConfirm(1);
        }

      }

    },
    reportSubmittedOnConfirm: function (buttonIndex) {

      console.log('reportSubmittedOnConfirm ' + buttonIndex);

      switch (buttonIndex) {
        case 1 : {
          canteenreport.storage.deleteReport();
          this.changeScreen(this.HOME_SCREEN);
          break;
        }
      }

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
    saveReport: function (buttonIndex) {

      console.log('saveReport ' + buttonIndex);

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
          $.publish('report-saved');
        }
      }, 3000);

    },

    /**
     */
    changeScreen: function (screen) {

      switch (screen) {

        case this.INPUT_SCREEN : {

          $('body').addClass('app');
          $('#app').scrollTop(0);
          $('#container').css('left', -this.screenWidth + 'px');
          this.scrollToSectionById('#form');

          break;
        }

        default : {

          $('body').removeClass('app');
          $('#container').css('left', '0');
          this.scrollToSectionById('#form');
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

  		$.publish('app-offline');

  	},

  	goOnline: function () {

  		$.publish('app-online');

  	},

    scrollToSection: function (event) {

      var id = $(event.currentTarget).attr('href');

      if (id.length) {
        this.scrollToSectionById(id);
      }

      event.preventDefault();

    },

    scrollToSectionById: function (id, dur, easing) {

      // console.group('scrollToSectionById');
      // console.info('id: ' + id);
      // console.info('dur: ' + dur);

      var duration = 400;
      var easingFunction = 'easeOutQuad';

      if (dur !== undefined) {
        duration = dur;
      }

      if (easing !== undefined) {
        easingFunction = easing;
      }

      // console.info('duration: ' + duration);
      // console.info('easingFunction: ' + easingFunction);

      $('html, body').animate(
        {
          scrollTop: $(id).offset().top - 70
        },
        duration,
        easingFunction
      );

      //console.groupEnd();

    }

  };

}(this));