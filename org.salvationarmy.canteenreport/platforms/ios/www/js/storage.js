var storage = {
	initialize: function () {
		this.events();
		this.syncForm();

		if (amplify.store('active') != null) {
			$('#form').attr('data-unique', amplify.store('active'));

			this.syncForm();
		}

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
		});

		s.doSave();
		s.resetChanged();

		$('#form').on('blur keydown', 'input, textarea, select', function () {
			s.showChanged();
		});
	},
	showChanged: function () {
		// console.log('changed!');
		$('.sync-btn').removeClass('disabled');

		amplify.store('canteen.changed', 1);
	},
	resetChanged: function () {
		// console.log('acknowledged');
		$('.sync-btn').addClass('disabled');

		amplify.store('canteen.changed', 0);
	},
	doSave: function () {
		var s = this;
		s.intv = setInterval(function () {
			if (amplify.store('canteen.changed') == 1 && s.isOnline()) {
				s.saveForm();
			}
		}, 5000);
	},
	syncForm: function () {
		var unique = $('#form').attr('data-unique');

		if (amplify.store(unique) !== null) {

			this.data.report[unique] = amplify.store(unique);

			for (var key in this.data.report[unique]) {
				if (this.data.report[unique].hasOwnProperty(key)) {

					this.field(this.data.report[unique][key].name, this.data.report[unique][key].value);
				}
			}

		}
	},
	saveForm: function () {
		var unique = 0,
			formdata = this.getFormJSON();

		if ($('#form').attr('data-unique') != null) {
			unique = $('#form').attr('data-unique');

			if ($('#id').length == 0 || $('#id').val() != unique) {
				$('#id').remove();
				$('<input />')
					.attr('type', 'hidden')
					.attr('id', 'id')
					.attr('name', 'id')
					.val(unique)
					.appendTo($('#form'));
			}

			if (unique == 0) {
				// Save
				this.save(formdata, true);
			} else {
				// Save
				this.save(formdata, false);
			}

		} else {

			// Save and Initilize
			this.save(formdata, true);

		}

		// amplify.store(unique, null);

	},
	save: function (data, init) {

		// console.log('saving...');

		// console.log('data', data);

		var id,
			msg
			s = this;

		if (s.isOnline()) {

			$.ajax({
				url: 'http://23.239.8.146/backend-code/index.php/canteen/add',
				type: 'POST',
				data: data,
				dataType: 'text',
				success: function (res, status, xhr) {

					// console.log("I am here");

					var result = res.split(':');

					msg = result[0];
					id = result[1];

					// console.log(result, msg, id);
					// console.log('ajaxed');

					if ("success" == msg) {

						// console.log('successful');

						if (init) {

							// console.log('making input');

							s.setupIDandDate(id);

							$('#form').attr('data-unique', id);

							amplify.store('active', id);
							amplify.store(0, null);
						}

						// console.log('resetting?');
						s.resetChanged();

					}
				},
				error: function (a, b, c) {
					console.log(a, b, c);
				}
			}).done(function () {

				data = s.getFormJSON();

				// console.log("amplify", id, data);

				amplify.store(id, data);

			});

		} else {

			id = $('#form').attr('data-unique');

			data = s.getFormJSON();

			// console.log("amplify", id, data);

			amplify.store(id, data);

		}



	},
	setupIDandDate: function (id) {

		$('<input />')
			.attr('type', 'hidden')
			.attr('id', 'id')
			.attr('name', 'id')
			.val(id)
			.appendTo($('#form'));

		var date = new Date();

		$('<input />')
			.attr('type', 'hidden')
			.attr('id', 'date')
			.attr('name', 'date')
			.val(date.getTime())
			.appendTo($('#form'));

	},
	field: function (id, value) {
		var $field = $('#' + id);

		// console.log('trying', $field, $field.is('input[type=text]'));

		if ($field.length == 0) {

			if (id.indexOf('team-member') != -1) {
				if (id != 'team-member-1') {
					var d = id.split('-');

					// console.log('ATTEMPTING TO ADD MEMBER', d[2], value);

					form.addNewMember(d[2], value);
				}
			}

		}

		// Text field
		if ($field.is('textarea')) {

			// console.log('inside');

			// console.log($field.val(), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}

		// Text field
		if ($field.is('input[type=text]')) {

			// console.log('inside');

			// console.log($field.attr('id'), $field.attr('id').indexOf('team-member'));

			if ($field.attr('id').indexOf('team-member') != -1) {
				if ($field.attr('id') != 'team-member-1') {
					var id = $field.attr('id').split('-');

					// console.log('ATTEMPTING TO ADD MEMBER', id[2], value);

					form.addMember(id[2], value);
				} else {
					if ($field.val() !== value) {
						$field.val(value);
					}
				}
			} else {

				// console.log($field.val(), value);
				if ($field.val() !== value) {
					$field.val(value);
				}

			}

		}

		// Number field
		if ($field.is('input[type=number]')) {

			// console.log('inside');

			// console.log($field.val(), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}

		// Checkbox
		if ($field.is('input[type=checkbox]')) {

			// console.log('inside');

			// console.log($field, $field.val(), value);
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

			// console.log('inside');

			// console.log($field.val(), value);
			if ($field.val() !== value) {
				$field.val(value);
			}

		}
	},
	getFormJSON: function () {
		return JSON.parse(JSON.stringify($('#form').serializeArray()));
	},
	getFormJSONString: function () {
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
