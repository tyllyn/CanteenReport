var canteenreport = canteenreport || {};

canteenreport.form = {

	initialized: false,
	focusCallback: null,	// callback for when the form is focused.

	$form: null,

	initialize: function (focusCallback) {

		canteenreport.app.log('form.initialize');

		if (!this.initialized) {

			this.focusCallback = focusCallback;

			this.$form = $('#form');
			this.$form.on('focusout', $.proxy(this.onfocus, this));

			this.events();
			this.initialized = true;

		}

		this.reset();

	},

	/***
	 	* Called when the form focuses. Listener added in initialize.
	 	*/
	onfocus: function() {
		if (this.focusCallback != null) {
			this.focusCallback.call();
		}
	},

	events: function () {

		var f = this;

		$('.members-group').on('touchstart', '.js-add-member', function () {
			var next = $('.team-member').length + 1;
			f.addNewMember(next, '');
		}).on('touchstart', '.js-remove-member', function () {
			var $this = $(this);
			if ($('.team-member').length > 1) {
				// Remove current row
				$this.parents('.team-member').remove();
				// Renumber rows
				var i = 1;
				$('.team-member').each(function () {
					$(this)
						.removeClass()
						.addClass('input-group input-group-lg team-member team-member-' + i)
						.find('input')
							.attr('name', 'team-member-' + i)
							.attr('id', 'team-member-' + i);
					i += 1;
				});
			}
		});

		/****
	  		* adds increment functionality to the + buttons
	  		*/
	    $('.increment').on('touchstart', function (event) {

	     	var incrementNumberField = $(event.currentTarget).parent().next();
	     	var incrementNumberFieldVal = Number(incrementNumberField.val());
	     	incrementNumberField.val(incrementNumberFieldVal + 1);

	     	event.preventDefault();

	     });

	    $('.increment-minus').on('touchstart', function (event) {

	     	var incrementNumberField = $(event.currentTarget).parent().prev();
	     	var incrementNumberFieldVal = Number(incrementNumberField.val());

	     	var newVal = incrementNumberFieldVal - 1;
	     	if (newVal < 0) {
	     		newVal = 0;
	     	}

	     	incrementNumberField.val(newVal);

	     	event.preventDefault();

	     });

	    /****
	     	* fuel level
	     	*/
	    $('.fuel-level-button').on('touchstart', function (event) {

	     	if(app.$activeFuelLevel != undefined){
	     		app.$activeFuelLevel.removeClass('btn-is-active');
	     	}
	     	app.$activeFuelLevel = $(event.currentTarget).addClass('btn-is-active');

	     	$('#end-fuel-level').val(app.$activeFuelLevel.data().level);

	     	event.preventDefault();

	     });

	    /****
	     	* water level
	     	*/
	    $('.water-level-button').on('touchstart', function (event) {

	     	if(app.$activeWaterLevel != undefined){
	     		app.$activeWaterLevel.removeClass('btn-is-active');
	     	}
	     	app.$activeWaterLevel = $(event.currentTarget).addClass('btn-is-active');

	     	$('#end-water-level').val(app.$activeWaterLevel.data().level);

	     	event.preventDefault();

	     });

	    $('#submit').on('touchstart', 'button', function () {

	    	$('<input />')
	      		.attr('type', 'hidden')
	      		.attr('name', 'finished')
	      		.attr('id', 'finished')
	      		.val(1)
	      		.appendTo($('#form'));

	      	canteenreport.storage.saveForm();

	      	// todo: this seems like it should all be moved to storage
	      	var id = $('#form').attr('data-unique');

	      	amplify.store('active', 0);
	      	amplify.store(id, null);

	      	$('#form').attr('data-unique', '0');

	      	// todo: should be moved to app
	      	$('#start').show();
	      	$('#app').hide();

	    });

	},

	/****
		* Basic form reset. Only resets the HTML form
		*/
	reset: function () {

		canteenreport.app.log('form.reset');
		this.$form[0].reset();

	},

	/***
	 	* todo: what does this do?
	 	*/
	addNewMember: function (id, val) {

		canteenreport.app.log('form.addNewMember');

		// var $newmember;

		// // Clone first member, strip all data, and append
		$newmember = $('.team-member-1')
			.clone()
			.removeClass('team-member-1')
			.addClass('team-member-' + id)
			.find('.js-add-member-container')
			.remove()
			.end()
			.find('input')
			.val(val)
			.attr('id', 'team-member-' + id)
			.attr('name', 'team-member-' + id)
			.end()
			.appendTo($('.members-group'));

	},

	getForm: function() {
		return this.$form;
	}

};
