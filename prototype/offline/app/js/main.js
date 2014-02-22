/* global window */
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

	PROTO.isOnline = function () {
		return navigator.onLine;
	};

	$(function () {

		// Cached selectors
		PROTO.$elm = {};

		// Arbitrary data (Comes after selectors so we can use them here)
		PROTO.data = {};
		PROTO.data.online = function () {
			return PROTO.isOnline();
		};

		PROTO.init();

	});

/** uncomment to see Namespace in the global scope for debugging. */
	window.Namespace = {
		PROTO : PROTO
	};
/* */

})(window.jQuery, window, window.document);
