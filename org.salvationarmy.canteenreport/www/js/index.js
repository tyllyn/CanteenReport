/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    $activeFuelLevel: undefined,
    $activeWaterLevel: undefined,

    // Application Constructor
    initialize: function() {

        this.bindEvents();

        // Cache selectors
        var topMenu = $("header"),
            topMenuHeight = topMenu.outerHeight()+15,
            // All list items
            menuItems = $('.left-menu').find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function(){
              var item = $($(this).attr("href"));
              if (item.length) { return item; }
            });

        // Bind to scroll
        $(window).scroll(function(){
           // Get container scroll position
           var fromTop = $(this).scrollTop()+topMenuHeight;

           // Get id of current scroll item
           var cur = scrollItems.map(function(){
             if ($(this).offset().top < fromTop)
               return this;
           });
           // Get the id of the current element
           cur = cur[cur.length-1];
           var id = cur && cur.length ? cur[0].id : "";
           // Set/remove active class
           menuItems
             .parent().removeClass("isActive")
             .end().filter("[href=#"+id+"]").parent().addClass("isActive");
        });

        $('#new-report-button').on('touchstart', function(event)
        {
          $('#start').hide();
          $('#app').show();
        });

        $('#close-button').on('touchstart', function(event)
        {
          $('#start').show();
          $('#app').hide();

          amplify.store('active', '0');
        });

        this.showReports();

        /**
         * adds increment functionality to the + buttons
         */
        $('.increment').on('touchstart', function(event)
        {
            var incrementNumberField = $(event.currentTarget).parent().next();
            var incrementNumberFieldVal = Number(incrementNumberField.val());
            incrementNumberField.val(incrementNumberFieldVal + 1);

            event.preventDefault();
        });

        $('.increment-minus').on('touchstart', function(event)
        {
            var incrementNumberField = $(event.currentTarget).parent().prev();
            var incrementNumberFieldVal = Number(incrementNumberField.val());

            var newVal = incrementNumberFieldVal - 1;
            if(newVal < 0)
                newVal = 0;

            incrementNumberField.val(newVal);

            event.preventDefault();
        });

        /**
         * fuel level
         */
        $('.fuel-level-button').on('touchstart', function(event)
        {
            if(app.$activeFuelLevel != undefined){
                app.$activeFuelLevel.removeClass('btn-is-active');
            }
            app.$activeFuelLevel = $(event.currentTarget).addClass('btn-is-active');

            $('#end-fuel-level').val(app.$activeFuelLevel.data().level);

            event.preventDefault();
        });

        /**
         * water level
         */
        $('.water-level-button').on('touchstart', function(event)
        {
            if(app.$activeWaterLevel != undefined){
                app.$activeWaterLevel.removeClass('btn-is-active');
            }
            app.$activeWaterLevel = $(event.currentTarget).addClass('btn-is-active');

            $('#end-water-level').val(app.$activeWaterLevel.data().level);

            event.preventDefault();
        });

        /**
         */
        $('.left-menu').find('a').on(
        {
            touchstart: function(e){
                var id = $(this).attr('href');

                if($(id).length){
                    $('html, body').animate({
                        scrollTop: $(id).offset().top-70
                    })
                }

                e.preventDefault();
            }
        });

    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // Show open reports
    showReports: function() {

      var storaged = amplify.store(),
          dates = [];

      for (var key in storaged) {

        if (storaged.hasOwnProperty(key)) {

          if (key != 'active' && key != 'canteen.changed') {

            var d = storaged[key];

            dates[key] = {};

            for (var kkey in d) {

              if (d.hasOwnProperty(kkey)) {

                if (d[kkey].name == "date") {

                  dates[key].fdate = d[kkey].value;

                }

                if (d[kkey].name == "id") {

                  dates[key].fid = d[kkey].value;

                }

              }

            }

          }

        }

      }

      if (dates.length > 0) {

        $('.open-report')
          .find('a')
            .remove();

        for (var jkey in dates) {

          if (dates.hasOwnProperty(jkey)) {

            var format = new Date();

            format.setTime(dates[jkey].fdate);



            console.log(format);

            $("<a />")
              .attr('href', 'javascript:;')
              .addClass('date glyphicon glyphicon-chevron-right')
              .attr('data-report', dates[jkey].fid)
              .html(
                parseInt(format.getMonth(), 10) - 1 + '/' + format.getDate() + '/' + format.getFullYear() + ' ' + format.getHours() + ':' + format.getMinutes() + ':' + format.getSeconds()
              )
              .appendTo($('.open-report'));
          }

        }

      }

    }
};
