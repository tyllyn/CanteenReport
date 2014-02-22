var storage = {
	initialize: function () {

	},
	events: function () {
		var s = this;
		window.addEventListener('offline', function (e) {
			s.goOffline();
		});

		window.addEventListener('online', function (e) {
			s.goOnline();
		});

		$('#form').on('submit', function (e) {
			e.preventDefault();
			console.log(JSON.stringify($('#form').serializeArray()));
		});

		$('#form').on('blur keydown', 'input, textarea, select', function () {
			PROTO.saveForm();
		});
	},
	syncForm: function () {
		var unique = $('#form').attr('data-unique');

		console.log(amplify.store(unique));

		if (amplify.store(unique) !== null) {

			this.data.report[unique] = amplify.store(unique);

			for (var key in this.data.report[unique]) {
				if (this.data.report[unique].hasOwnProperty(key)) {
					console.log(this.data.report[unique][key], this.data.report[unique][key].name, this.data.report[unique][key].value);

					this.field(this.data.report[unique][key].name, this.data.report[unique][key].value);
				}
			}

		}
	},
	saveForm: function () {
		var unique = $('#form').attr('data-unique'),
			formdata = PROTO.getFormJSON();

		//amplify.store(unique, null);

		amplify.store(unique, formdata);
	},
	goOffline: function () {

	},
	goOnline: function () {

	},
	isOnline: function () {
		return navigator.onLine;
	},
	data: {
		report: []
	}
}
