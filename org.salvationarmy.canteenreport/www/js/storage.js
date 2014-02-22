var storage = {
	initialize: function () {
		this.events();
		this.syncForm();

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

		// amplify.store(unique, null);

		amplify.store(unique, formdata);
	},
	field: function (id, value) {
		var $field = $('#' + id);

		console.log('trying', $field, $field.is('input[type=text]'));

		// Text field
		if ($field.is('input[type=text]')) {

			console.log('inside');

			console.log($field.val(), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}

		// Text field
		if ($field.is('textarea')) {

			console.log('inside');

			if ($field.attr('id').indexOf('team-member') != -1) {
				if ($field.attr('id') != 'team-member-1') {
					var id = $field.attr('id').split('-');

					console.log('ATTEMPTING TO ADD MEMBER', id[2], value);

					form.addMember(id[2], value);
				} else {
					if ($field.val() !== value) {
						$field.val(value);
					}
				}
			} else {

				console.log($field.val(), value);
				if ($field.val() !== value) {
					$field.val(value);
				}

			}

		}

		// Number field
		if ($field.is('input[type=number]')) {

			console.log('inside');

			console.log($field.val(), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}

		// Checkbox
		if ($field.is('input[type=checkbox]')) {

			// console.log('inside');

			console.log($field, $field.val(), value);
			if ($field.attr('checked') !== 'checked') {
				$field.attr('checked', 'checked');
			}

		}

		// Select
		if ($field.is('select')) {

			// console.log('inside');

			// console.log($field.find('option[value=' + value + ']'), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}

		// DateTime
		if ($field.is('input[type=datetime-local]')) {

			console.log('inside');

			console.log($field.val(), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}
	},
	getFormJSON: function () {
		return JSON.parse(JSON.stringify($('#form').serializeArray()));
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
