/*global jQuery:false */
/*global canteenreport:false */
/*global amplify:false */
/*global $:false */

(function (canteenreport, undefined) {

	'use strict';

	var initialized = false;

	var $form;
	var $activeFuelLevelBtn;
	var $activeWaterLevelBtn;

	var form = canteenreport.form = function () {
		return this;
	};

	function reportError() {

		enable();

		$('#js-submit-button').removeClass('disabled');
		$('#js-form-message').html(canteenreport.FORM_ERROR_MESSAGE);

	}

	function reportSaved() {

		enable();

		$('#js-submit-button').removeClass('disabled');
		$('#js-form-message').html(canteenreport.FORM_SUBMITTED_MESSAGE);

	}

	form.initialize = function () {

		if (!initialized) {

			$form = $('#form');
			$form.on('focusout', $.proxy(onfocus, this));

			initialized = true;

			amplify.subscribe('request.success', reportSaved);
			amplify.subscribe('request.error', reportError);

			initEvents();

		}

		this.reset();

		canteenreport.publish('form-initialized');

	};

	/**
	* Creates a new report
	*/
	form.newReport = function (id, date) {

		$('#js-delete-button').hide();

		form.initialize();

		// console.group('form.createNewReport');
		// console.info('incident-id: ' + id);

		// clear the old form
		form.reset();
		setUnit();

		// cache the incident-id input and set its value to the id
		$('#incident-id').val(String(id));
		$('#creation-date').val(String(date));

		//console.groupEnd();

		// announce that we created a new report
		canteenreport.publish('new-report');

	};

	/**
	* Opens a backed up report
	*/
	form.openReport = function (report) {

		$('#js-delete-button').show();

		// console.group('form.openReport');
		// console.log(report);

		form.initialize();

		var i;

		for (i in report) {
			var name = report[i].name;
			var value = report[i].value;
			var $field = $form.find('[name="' + name + '"]');
			var fieldType = $field[0].type;
			if (fieldType === 'checkbox' || fieldType === 'radio') {
				//console.log('this is a radio button or checkbox');
				$field.prop('checked', 'checked');
			} else {
				$field.val(value);
			}
		}

		//console.groupEnd();

	};

	/**
	 * resets the form back to its blank state
	 */
	form.reset = function () {

		//console.log('form.reset')

		$form.find('input:text, input:password, input:file, select, textarea').val('');
		$form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');

	};


	/**
	 * Private Functions
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

	 	//$('input, button, textarea, select').attr('disabled', 'disabled');

	};


	var enable = function () {

		//$('input, button, textarea, select').removeAttr('disabled');

	};


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

			var id = '2';
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
		* Deletes the active report
		*/
		$('#js-delete-button').on('touchstart', function (event) {

		 	var confirmation = window.confirm('Pressing OK will delete this report and return you to the home screen');

		 	if (confirmation === true) {

		 		var id = $('#incident-id').val();
		 		canteenreport.storage.deleteReport(id);
		 	}

		});

		/**
		* form submit
		*/
		$('#js-submit-button').on('touchstart', function (event) {

			var valid = $form[0].checkValidity();

			disable();

			if (valid) {

				// sets a cookie for the last used unit number
				document.cookie = 'unitNumber=' + $('#incident-unit-number').val();

				//console.log('document.cookie: ' + document.cookie);

				$(this).addClass('disabled');
				$('#final').val('true'); // sets the report as final
				canteenreport.publish('submit-report');
				canteenreport.scrollToSectionById('#confirm', 4000, 'easeOutQuint');

			} else {

				enable();

				$('#js-form-message').html(canteenreport.FORM_FIELDS_ERROR_MESSAGE);
				canteenreport.publish('report-not-complete');

			}

			return false;

		});

	};

}( canteenreport, jQuery ) );
