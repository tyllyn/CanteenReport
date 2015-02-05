(function( canteenreport, undefined ) {

	'use strict';

	var initialized = false;

	var $form;
	var $activeFuelLevelBtn;
	var $activeWaterLevelBtn;

	var form = canteenreport.form = function () {

		return this;

	}

	form.initialize = function () {

		if (!initialized) {

			$form = $('#form');
			$form.on('focusout', $.proxy(onfocus, this));

			initEvents();

			initialized = true;

		}

		this.reset();

		canteenreport.publish('form-initialized');

	};

	/**
	 * Creates a new report
	 */
	form.newReport = function (id) {

		form.initialize();

		console.group('form.createNewReport');
		console.info('incident-id: ' + id);

		// clear the old form
		form.reset();

		// cache the incident-id input and set its value to the id
		$('#incident-id').val(String(id));

		console.groupEnd();

		// announce that we created a new report
		canteenreport.publish('new-report');

	};

	/**
	 * Opens a backed up report
	 */
	form.openReport = function (report) {

		console.group('form.openReport');
		console.log(report);

		form.initialize();

		var i;

		for (i in report) {

			var name = report[i].name;
			var value = report[i].value;
			var $field = $form.find('[name="' + name + '"]');
			var fieldType = $field[0].type;

			if (fieldType === 'checkbox' || fieldType === 'radio') {
				console.log('this is a radio button or checkbox')
				$field.prop('checked', 'checked');
			} else {
				$field.val(value);
			}

		}

		console.groupEnd();

	};

	/**
	 * resets the form back to its blank state
	 */
	form.reset = function () {

		console.log('form.reset')

    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');

	};


	/**
	 * Private Functions
	 */


	/**
 	 * Called when the form focuses. Listener added in initialize.
 	 */
	var onfocus = function () {

		canteenreport.publish('form-focused', $form);

	};

	/**
	 */
	var initEvents = function () {

		/**
  		* adds increment functionality to the + buttons
  		*/
    $('.increment').on('touchstart', function (event) {

     	var incrementNumberField = $(event.currentTarget).parent().next();
     	var incrementNumberFieldVal = Number(incrementNumberField.val());
     	incrementNumberField.val(incrementNumberFieldVal + 1);

     	return false;

    });
    $('.increment-minus').on('touchstart', function (event) {

     	var incrementNumberField = $(event.currentTarget).parent().prev();
     	var incrementNumberFieldVal = Number(incrementNumberField.val());

     	var newVal = incrementNumberFieldVal - 1;
     	if (newVal < 0) {
     		newVal = 0;
     	}

     	incrementNumberField.val(newVal);

     	return false;

    });

    /**
	   	* fuel level
	   	*/
	  $('.fuel-level-button').on('touchstart', function (event) {

	   	if (typeof $activeFuelLevelBtn != 'undefined') {
	   		$activeFuelLevelBtn.removeClass('btn-is-active');
	   	}
	   	$activeFuelLevelBtn = $(event.currentTarget).addClass('btn-is-active');

	   	// add the value to the hidden input so it can be hidden
	   	$('#end-fuel-level').val($activeFuelLevelBtn.data().level);

	   	return false;

	  });

	  /**
	   	* water level
	   	*/
	  $('.water-level-button').on('touchstart', function (event) {

	   	if (typeof $activeWaterLevelBtn != 'undefined') {
	   		$activeWaterLevelBtn.removeClass('btn-is-active');
	   	}
	   	$activeWaterLevelBtn = $(event.currentTarget).addClass('btn-is-active');

	   	// add the value to the hidden input so it can be hidden
	   	$('#end-water-level').val($activeWaterLevelBtn.data().level);

	   	return false;

	  });

	  /**
	   * Add new team member fields
	   */
	  $('.js-add-member').on('touchstart', function (event) {

	  	var id = '2'
	  	var val = '';

			// Clone first member, strip all data, and append
			var $newmember = $('.team-member-1')
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
				.appendTo($('#js-team-members'));

			return false;

	  });

	  /**
	   * Remove team member fields
	   */
	  $('.js-remove-member').on('touchstart', function (event) {

	  	var id = '2'
	  	var val = '';

			// Clone first member, strip all data, and append
			// var $newmember = $('.team-member-1')
			// 	.clone()
			// 	.removeClass('team-member-1')
			// 	.addClass('team-member-' + id)
			// 	.find('.js-add-member-container')
			// 	.remove()
			// 	.end()
			// 	.find('input')
			// 	.val(val)
			// 	.attr('id', 'team-member-' + id)
			// 	.attr('name', 'team-member-' + id)
			// 	.end()
			// 	.appendTo($('#js-team-members'));

			// return false;

	  });

	  /**
	   * form submit
	   */
	  $('#submit').on('touchstart', 'button', function (event) {

	  	var valid = false;

	  	// need to add error checking
    	$('<input />')
    		.attr('type', 'hidden')
    		.attr('name', 'finished')
    		.attr('id', 'finished')
    		.val(1)
    		.appendTo($('#form'));

    	if (valid) {
				canteenreport.publish('report-saved');
    	} else {
    		canteenreport.publish('report-not-complete');
    	}

    	//canteenreport.storage.saveForm();

    	// todo: this seems like it should all be moved to storage
    	//var id = $('#form').attr('data-unique');

    	// amplify.store('active', 0);
    	// amplify.store(id, null);

    	// $('#form').attr('data-unique', '0');

    	// todo: should be moved to app
    	// $('#start').show();
    	// $('#app').hide();

    	return false;

    });

	};

}( canteenreport, jQuery ) );