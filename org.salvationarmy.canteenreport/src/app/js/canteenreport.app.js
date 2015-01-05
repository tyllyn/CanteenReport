var canteenreport = canteenreport || {};

canteenreport.app = {

	debug: true,

	isOnline: false,
  isSyncing: false,
  formInitialized: false,

  form: null,

  $body: null,
	$syncBtn: null,
	$closeBtn: null,
  $newReportButton: null,
  $leftMenu: null,
  $leftMenuItems: null,
  $scrollItems: null,

	initialize: function() {

		// Cache selectors
    var topMenu = $("header"),
    	topMenuHeight = 84;


		this.isOnline = navigator.onLine;

    this.$body = $('body');

    //this.$menuItems = $('.left-menu').find("a"),
    // this.$scrollItems = menuItems.map(function () {
    //     var item = $($(this).attr("href"));
    //     if (item.length) { return item; }
    //   });

    // Bind to scroll
    // $(window).scroll(function(){

    //    // Get container scroll position
    //    var fromTop = $(this).scrollTop() + topMenuHeight;

    //    // Get id of current scroll item
    //    var cur = scrollItems.map(function(){
    //    	if ($(this).offset().top < fromTop)
    //    		return this;
    //    });
    //    cur = cur[cur.length-1];

    //    var id = cur && cur.length ? cur[0].id : "";
    //    // Set/remove active class
    //    menuItems
    //    	.parent().removeClass("isActive")
    //    	.end().filter("[href=#"+id+"]").parent().addClass("isActive");

    // });

    document.addEventListener('deviceready', this.onDeviceReady, false);
    window.addEventListener('offline', this.goOffline);
		window.addEventListener('online', this.goOnline);

    // creates a new report
    this.$newReportButton = $('#new-report-button').on('touchend', $.proxy(this.newReport, this));

    // close the open report
    this.$closeBtn = $('#btn-close').on('touchend', $.proxy(this.closeReport, this));

    // sync the report
    this.$syncBtn = $('#btn-sync').on('touchend', $.proxy(this.saveReport, this));

    amplify.subscribe('canteenreport-saved', $.proxy(this.reportSaved, this));

	},


  /***
    * Creates a new Canteen Report
    */
  newReport: function () {

    canteenreport.app.log('newReport');

    $('#start').hide();
    $('#app').show();

    var newReportId = new Date().getTime();

    if (!canteenreport.form.initialized) {

      // cache the leftMenu
      this.$leftMenu = $('#left-menu');

      // setup the left menu
      this.$leftMenuItems = this.$leftMenu.find('a').on('touchend', $.proxy(this.scrollToSection, this));

      // initialize the form
      canteenreport.form.initialize(canteenreport.app.formFocused);

    }

    canteenreport.form.createNewReport(newReportId);
    canteenreport.storage.initialize();

    // todo
    //amplify.store('active', '0');

    $('#form').attr('unique', 0);

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


  openReport: function () {

  },


  /***
    * Closes the current form.
    */
  closeReport: function () {

    this.$leftMenuItems.parent().removeClass("isActive").end().filter("[href=#incident]").parent().addClass("isActive");

    $('#start').show();
    $('#app').hide();

  },


  /***
    * Callback for the form focus listener. Assigned in initialize.
    */
  formFocused: function () {

    canteenreport.app.saveReport();

  },

  /***
    * Callback from Amplify
    */
  reportSaved: function () {

    canteenreport.app.log('canteenreport.app.savedForm');

    this.isSyncing = false;

    var scope = this;

    // this allows the sync animation to run its course before stopping
    setTimeout(function(){
      if (!scope.isSyncing) {
        scope.$body.removeClass('is-syncing');
      }
    }, 3000);

  },


  /***
   * Save function for the app. Called from formFocused and from $syncBtn.
   */
  saveReport: function () {

    canteenreport.app.log('canteenreport.app.saveForm');

    this.isSyncing = true;
    this.$body.addClass('is-syncing');
    canteenreport.storage.syncForm();

  },


  /***
   * deviceready Event Handler
   *
   * The scope of 'this' is the event. In order to call the 'receivedEvent'
   * function, we must explicity call 'app.receivedEvent(...);'
   */
  onDeviceReady: function() {

   	app.receivedEvent('deviceready');

  },

  /** Update DOM on a Received Event */
  receivedEvent: function(id) {

  	canteenreport.log('receivedEvent');

   	var parentElement = document.getElementById(id);
   	var listeningElement = parentElement.querySelector('.listening');
   	var receivedElement = parentElement.querySelector('.received');

   	listeningElement.setAttribute('style', 'display:none;');
   	receivedElement.setAttribute('style', 'display:block;');

  },

  goOffline: function () {
		canteenreport.app.log('goOffline');
		this.isOnline = false;
	},

	goOnline: function () {
		canteenreport.app.log('goOnline');
		this.isOnline = true;
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

$(function() {
  canteenreport.app.initialize();
})