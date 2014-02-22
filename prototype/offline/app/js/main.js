/* global window */
/* global amplify */
/* global navigator */
(function ($, window, document, undefined) {
	'use strict';

	var PROTO = PROTO || {};

	PROTO.init = function () {

		window.addEventListener('offline', function (e) {
			PROTO.goOffline();
		});

		window.addEventListener('online', function (e) {
			PROTO.goOnline();
		});

		if (PROTO.data.online) {
			PROTO.goOnline();
		} else {
			PROTO.goOffline();
		}

		$('#form').on('submit', function (e) {
			e.preventDefault();
			console.log(JSON.stringify($('#form').serializeArray()));
		});

		$('#form').on('blur keydown', 'input, textarea, select', function () {
			PROTO.saveForm();
		});

		PROTO.syncForm();

	};

	PROTO.goOffline = function () {
		console.log('offline');

		$('.status').removeClass('on off').addClass('off').text('Offline');
	};

	PROTO.goOnline = function () {
		console.log('online');

		$('.status').removeClass('on off').addClass('on').text('Online');
	};

	PROTO.sendData = function () {

	};

	PROTO.storeData = function () {

	};

	PROTO.syncForm = function () {

		var unique = $('#form').attr('data-unique');

		console.log(amplify.store(unique));

		if (amplify.store(unique) !== null) {

			PROTO.data.report[unique] = amplify.store(unique);

			for (var key in PROTO.data.report[unique]) {
				if (PROTO.data.report[unique].hasOwnProperty(key)) {
					console.log(PROTO.data.report[unique][key], PROTO.data.report[unique][key].name, PROTO.data.report[unique][key].value);

					PROTO.field(PROTO.data.report[unique][key].name, PROTO.data.report[unique][key].value);
				}
			}

		}

	};

	PROTO.saveForm = function () {

		var unique = $('#form').attr('data-unique'),
			formdata = PROTO.getFormJSON();

		//amplify.store(unique, null);

		amplify.store(unique, formdata);

		console.log(amplify.store(unique));

	};

	PROTO.field = function (id, value) {
		var $field = $('#' + id);

		// console.log('trying', $field, $field.is('input[type=text]'));

		// Text field
		if ($field.is('input[type=text]')) {

			// console.log('inside');

			console.log($field.val(), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}

		if ($field.is('input[type=checkbox]')) {

			// console.log('inside');

			console.log($field.val(), value);
			if ($field.attr('checked') !== 'checked') {
				$field.attr('checked', 'checked');
			}

		}

		if ($field.is('select')) {

			// console.log('inside');

			// console.log($field.find('option[value=' + value + ']'), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}
	};

	PROTO.isOnline = function () {
		return navigator.onLine;
	};

	PROTO.getFormJSON = function () {
		return JSON.parse(JSON.stringify(PROTO.$elm.form.serializeArray()));
	};

	$(function () {

		// Cached selectors
		PROTO.$elm = {};
		PROTO.$elm.form = $('#form');

		// Arbitrary data (Comes after selectors so we can use them here)
		PROTO.data = {};
		PROTO.data.online = function () {
			return PROTO.isOnline();
		};
		PROTO.data.report = [];

		PROTO.init();

	});

/** uncomment to see Namespace in the global scope for debugging. */
	window.REI = {
		PROTO : PROTO
	};
/* */

})(window.jQuery, window, window.document);
