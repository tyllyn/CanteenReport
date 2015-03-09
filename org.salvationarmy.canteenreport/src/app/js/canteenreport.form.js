/*global jQuery:false */
/*global canteenreport:false */
/*global amplify:false */
/*global $:false */

(function (canteenreport, undefined) {

	'use strict';

	var SUBMIT_MESSAGE = 'Ready to submit? Please check all fields before submitting.';
    var DELETE_TITLE = 'Delete This Report?';
    var DELETE_MESSAGE = 'Delete this report and return to the home screen?';
    var SUBMITTED_MESSAGE = 'Your report has been submitted.';
    var ERROR_MESSAGE = 'There was an error submitting your report.';
    var FIELDS_ERROR_MESSAGE = 'You have errors in your form. Please make sure all required fields are filled out.';

	var initialized = false;

	var $form;

	var requiredFieldNames = [];

	// return the public api
	var form = canteenreport.form = function () {
		return this;
	};

	form.initialize = function () {

		if (!initialized) {

			$form = $('#form').on('focusout', $.proxy(onfocus, this));

			initialized = true;

			$.subscribe('submit-report', $.proxy(reportSubmitting, this));
			$.subscribe('report-error', $.proxy(reportError, this));
			$.subscribe('report-submitted', $.proxy(reportSubmitted, this));

			requiredFieldNames = $('input, textarea, select, datetime-local').filter('[required]');

			initEvents();

		}

		this.reset();

		$.publish('form-initialized');

	};

	function reportError () {

		enable();

		$('#js-submit-button').removeClass('disabled');
		$('#js-form-message').html(ERROR_MESSAGE);

	}

	function reportSubmitted () {

		enable();
		form.reset();

		$('#js-submit-button').removeClass('disabled');
		$('#js-form-message').html(SUBMITTED_MESSAGE);

	}

	function reportSubmitting () {

		disable();

	}

	/**
	* Creates a new report
	*/
	form.newReport = function (id, date) {

		$('#js-delete-button').hide();

		form.initialize();

		// clear the old form
		form.reset();
		setUnit();

		// cache the incident-id input and set its value to the id
		$('#incident-id').val(String(id));
		$('#creation-date').val(String(date));

		//console.groupEnd();

		// announce that we created a new report
		$.publish('new-report');

	};

	/**
	* Opens a backed up report
	*/
	form.openReport = function (report) {

		$('#js-delete-button').show();

		form.initialize();

		// restores all of the data to the form
		for (var i in report) {
			var name = report[i].name;
			var value = report[i].value;
			var $field = $form.find('[name="' + name + '"]');
			if ($field[0]) {

				var fieldType = $field[0].type;

				switch (fieldType) {
					case 'checkbox' :
					case 'radio' : {
						$field.prop('checked', 'checked');
						break;
					}
					default: {
						$field.val(value);
					}
				}
			}
		}

		//manually restore the fuel and water levels
		var fuelLevel = $('#end-fuel-level').val();
		if (fuelLevel !== '') {
			$('#fuel-level-button-' + fuelLevel).addClass('btn-is-active');
		}

		var waterLevel = $('#end-water-level').val();
		if (waterLevel !== '') {
			$('#water-level-button-' + waterLevel).addClass('btn-is-active');
		}

	};

	/**
	 * resets the form back to its blank state
	 */
	form.reset = function () {

		$form[0].reset();

		$('#js-tabs a:first').tab('show');
		$('#incident-state').val('PA');
		$('.fuel-level-button').removeClass('btn-is-active');
		$('.water-level-button').removeClass('btn-is-active');

	};


	/**
	 * Private Functions
	 */


	var submit = function (event) {

		console.log('form.submit');

		var valid = true;

		for (var i = 0; i < requiredFieldNames.length; i++) {

			var $field = $(requiredFieldNames[i]);
			var type = $field.attr('type');

			if (type === 'text') {

				if ($field[0].checkValidity()) {
					$field.removeClass('invalid');
				} else {
					valid = false;
					$field.addClass('invalid');
				}

			}

			if (type === 'datetime-local') {

				if ($field.val() === '') {
					valid = false;
					$field.addClass('invalid');
				} else {
					$field.removeClass('invalid');
				}

			}

		}

		// validate the incident-type
		// if ($('input[type="checkbox"][name="incident-type"]:checked').length === 0) {
		// 	valid = false;
		// }

		if ($('#js-incident-type input[type="checkbox"]:checked').length === 0) {
			console.log('NOTHIGN IS CHECKED')
			valid = false;
		}

		if (valid) {

			// sets a cookie for the last used unit number
			document.cookie = 'unitNumber=' + $('#incident-unit-number').val();
			console.log('document.cookie: ' + document.cookie);

			$(this).addClass('disabled');
			$('#final').val('true'); // sets the report as final

			$.publish('submit-report');

		} else {

			$('#js-form-message').html(FIELDS_ERROR_MESSAGE);
			$.publish('report-not-complete');

		}

		return false;

	};


	/**
	 * Confirms and notifies that we want to delete this report
	 */
	var deleteReport = function () {

		console.log('form.deleteReport');

		if (!form.debug) {

			navigator.notification.confirm (
				DELETE_MESSAGE,
				$.proxy(deleteReportOnConfirm, this),
				DELETE_TITLE,
				['Yes', 'No']
			);

		} else {

			var confirm = window.confirm(DELETE_MESSAGE);
			if (confirm === true) {
				deleteReportOnConfirm(1);
			}

		}

		return false;

	};
	var deleteReportOnConfirm = function (buttonIndex) {

		switch (buttonIndex) {

	        case 1 : {
	        	var id = $('#incident-id').val();
				$.publish('delete-report', {id: id});
			}

		}

	};

	/**
	 */
	var setUnit = function () {

		//console.group('form.setUnit');

		var cookie = document.cookie;
		var unitNumber;

		//console.info('cookie: ' + cookie);

		// dig through the cookie for what we need
		var name = 'unitNumber' + "=";
		var ca = document.cookie.split(';');

		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				unitNumber = c.substring(name.length, c.length);
				break;
			}
		}

		//console.info('unitNumber: ' + unitNumber);

		$('#incident-unit-number').val(unitNumber);

		//console.groupEnd();

	};

	/**
	 * Disables the form to prevent user input while the form is submitting
	 */
	var disable = function () {

	 	$('input, button, textarea, select').attr('disabled', 'disabled');

	};

	var enable = function () {

		$('input, button, textarea, select').removeAttr('disabled');

	};

	/**
 	 * Called when the form focuses. Listener added in initialize.
 	 */
 	var onfocus = function () {

 	 	$.publish('form-focused', $form);

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

			onfocus();

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

			onfocus();

			return false;

		});

		/**
		* fuel level
		*/
		$('.fuel-level-button').on('touchstart', function (event) {

			$('.fuel-level-button').removeClass('btn-is-active');
			$(this).addClass('btn-is-active');
			$('#end-fuel-level').val($(this).data().level);

			onfocus();

			return false;

		});

		/**
		* water level
		*/
	   	$('.water-level-button').on('touchstart', function (event) {

			$('.water-level-button').removeClass('btn-is-active');
			$(this).addClass('btn-is-active');
			$('#end-water-level').val($(this).data().level);

			onfocus();

			return false;

	   	});

		/**
		* Add new team member fields
		*/
		$('#js-add-member-btn').on('touchstart', function (event) {

			var id = $('.team-member').length + 1;
			var val = '';

			// Clone first member, strip all data, and append
			var $newmember = $('.team-member-1')
				.clone()
				.removeClass('team-member-1')
				.addClass('team-member-' + id)
				.attr('id', 'team-member-container-' + id)
				.find('.js-add-member-container')
				.remove()
				.end()
				.find('input')
				.val(val)
				.attr('id', 'team-member-' + id)
				.attr('name', 'team-member-' + id)
				.end()
				.find('.js-remove-member-btn')
				.attr('data-team-member-id', id)
				.end()
				.appendTo($('#js-team-members'));

			/**
			* Remove team member fields
			*/
			$('.js-remove-member-btn').unbind('touchstart').on('touchstart', function (event) {

				var id = $(event.currentTarget).data().teamMemberId;
				$('#' + 'team-member-container-' + id).remove();

				return false;

			});

			return false;

		});

		/**
		* Deletes the active report
		*/
		$('#js-delete-button').on('touchstart', $.proxy(deleteReport, this));

		/**
		* form submit
		*/
		$('#js-submit-button').on('touchstart', $.proxy(submit, this));

	};

}(canteenreport, jQuery));
