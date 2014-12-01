var canteenreport = canteenreport || {};

canteenreport.app = {

  debug: true,

  $activeFuelLevel: undefined,
  $activeWaterLevel: undefined,
  $syncBtn: null,

  initialize: function() {

    this.log('app.initialize');

    this.bindEvents();

    // Cache selectors
    var topMenu = $("header"),
      //topMenuHeight = topMenu.outerHeight()+15,
      topMenuHeight = 84,
      // All list items
      menuItems = $('.left-menu').find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

    this.$syncBtn = $('#btn-sync');

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

    // new report
    // todo: imporove
    $('#new-report-button').on('touchend', function (event) {

      $('#start').hide();
      $('#app').show();

      canteenreport.storage.initialize();
      canteenreport.form.initialize();

      amplify.store('active', '0');

      $('#form').attr('unique', 0);

    });

    // close the open report
    $('#btn-close').on('touchend', function (event) {

      menuItems.parent().removeClass("isActive").end().filter("[href=#incident]").parent().addClass("isActive");

      $('#start').show();
      $('#app').hide();

    });

    // sync the report
    this.$syncBtn.on('click', function () {
      canteenreport.storage.saveForm();
    });

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

    // open unfinisehd report button
    // todo: finish, make real
    // $('.open-report').on('click', 'a', function (e) {

    //   canteenreport.form.initialize(); // start up the form

    //   if ($(this).attr('data-report') != null) {

    //     amplify.store('active', $(this).attr('data-report'));

    //     $('#form').attr('data-unique', $(this).attr('data-report'));
    //     $('#start').hide();
    //     $('#app').show();

    //   }

    //   e.preventDefault();

    // });

  },

  /**
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
    *
    */


  /**
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

    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

  },

  /** Show open reports */
  // showReports: function() {

  //   this.log('showReports');

  //   var storaged = amplify.store(),
  //   dates = [];

  //   for (var key in storaged) {

  //     if (storaged.hasOwnProperty(key)) {

  //       if (key != 'active' && key != 'canteen.changed') {

  //         var d = storaged[key];

  //         dates[key] = {};

  //         for (var kkey in d) {

  //           if (d.hasOwnProperty(kkey)) {

  //             if (d[kkey].name == "date") {

  //               dates[key].fdate = d[kkey].value;

  //             }

  //             if (d[kkey].name == "id") {

  //               dates[key].fid = d[kkey].value;

  //             }

  //           }

  //         }

  //       }

  //     }

  //   }

  //   if (dates.length > 0) {

  //     $('.open-report').find('a').remove();

  //     for (var jkey in dates) {

  //       if (dates.hasOwnProperty(jkey)) {

  //         var format = new Date();
  //         format.setTime(dates[jkey].fdate);

  //         $("<a />")
  //         .attr('href', 'javascript:;')
  //         .addClass('date glyphicon glyphicon-chevron-right')
  //         .attr('data-report', dates[jkey].fid)
  //         .html(
  //           parseInt(format.getMonth(), 10) - 1 + '/' + format.getDate() + '/' + format.getFullYear() + ' ' + format.getHours() + ':' + format.getMinutes() + ':' + format.getSeconds()
  //           )
  //         .appendTo($('.open-report'));
  //       }

  //     }

  //   }

  // },

  /**
   * Log a message if debug is true
   */
  log: function (message) {

    if (this.debug) {
      console.log(message);
    }

  }

};
