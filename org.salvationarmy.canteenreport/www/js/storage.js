var storage = {
	initialize: function () {
		this.events();
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
			s.saveForm();
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
			formdata = this.getFormJSON();

		//amplify.store(unique, null);

		amplify.store(unique, formdata);
	},
	getFormJSON: function () {
		return JSON.stringify($('#form').serializeArray());
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
