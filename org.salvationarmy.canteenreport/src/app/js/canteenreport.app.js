var canteenreport = canteenreport || {};

canteenreport.app = {

	debug: true,

	isOnline: false,
  isSyncing: false,

	$activeFuelLevel: undefined,
	$activeWaterLevel: undefined,
	$syncBtn: null,
	$closeBtn: null,
  $body: null,

	initialize: function() {

		// Cache selectors
    var topMenu = $("header"),
    	topMenuHeight = 84,
    	menuItems = $('.left-menu').find("a"),
    	scrollItems = menuItems.map(function () {
    		var item = $($(this).attr("href"));
    		if (item.length) { return item; }
    	});

		this.isOnline = navigator.onLine;
		this.bindEvents();

    this.$body = $('body');
    this.$syncBtn = $('#btn-sync');
    this.$closeBtn = $('#btn-close');

    // Bind to scroll
    $(window).scroll(function(){

       // Get container scroll position
       var fromTop = $(this).scrollTop() + topMenuHeight;

       // Get id of current scroll item
       var cur = scrollItems.map(function(){
       	if ($(this).offset().top < fromTop)
       		return this;
       });
       cur = cur[cur.length-1];

       var id = cur && cur.length ? cur[0].id : "";
       // Set/remove active class
       menuItems
       	.parent().removeClass("isActive")
       	.end().filter("[href=#"+id+"]").parent().addClass("isActive");

    });

    window.addEventListener('offline', this.goOffline);
		window.addEventListener('online', this.goOnline);

    // new report
    // todo: imporove
    $('#new-report-button').on('touchend', function (event) {

    	$('#start').hide();
    	$('#app').show();

    	canteenreport.storage.initialize();
      canteenreport.form.initialize(canteenreport.app.formFocused);

      // todo
      //amplify.store('active', '0');

      $('#form').attr('unique', 0);

    });

    // close the open report
    this.$closeBtn.on('touchend', function (event) {

    	menuItems.parent().removeClass("isActive").end().filter("[href=#incident]").parent().addClass("isActive");

    	$('#start').show();
    	$('#app').hide();

    });

    // sync the report
    this.$syncBtn.on('click', $.proxy(this.saveForm, this));

    // setup the left menu
    $('.left-menu').find('a').on({
    	touchstart: function(e){
    		var id = $(this).attr('href');
    		if($(id).length){
    			$('html, body').animate({
    				scrollTop: $(id).offset().top - 70
    			});
    		}
    		e.preventDefault();
    	}
    });

    amplify.subscribe('canteenreport-saved', $.proxy(this.savedForm, this));

	},

  /***
    * Callback for the form focus listener. Assigned in initialize.
    */
  formFocused: function () {
    canteenreport.app.saveForm();
  },

  savedForm: function () {

    canteenreport.app.log('canteenreport.app.savedForm');

    this.isSyncing = false;

    var scope = this;

    setTimeout(function(){
      if (!scope.isSyncing) {
        scope.$body.removeClass('is-syncing');
      }
    }, 3000);

  },

  /***
   * Save function for the app.
   */
  saveForm: function () {
    canteenreport.app.log('canteenreport.app.saveForm');

    this.isSyncing = true;
    this.$body.addClass('is-syncing');
    canteenreport.storage.syncForm();
  },

  /***
   * Bind Event Listeners
   *
   * Bind any events that are required on startup. Common events are:
   * 'load', 'deviceready', 'offline', and 'online'.
   */
  bindEvents: function() {

   	this.log('app.bindEvents');

   	document.addEventListener('deviceready', this.onDeviceReady, false);

  },


  /***
   * deviceready Event Handler
   *
   * The scope of 'this' is the event. In order to call the 'receivedEvent'
   * function, we must explicity call 'app.receivedEvent(...);'
   */
  onDeviceReady: function() {

   	console.log('app.onDeviceReady')

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
