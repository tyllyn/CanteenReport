var canteenreport = canteenreport || {};

canteenreport.storage = {

	apiUrl: 'http://23.239.8.146/backend-code/index.php/canteen/add',
	store: null,
	id: '23',

	initialize: function () {

		canteenreport.app.log('storage.initialize');

		// var timestamp = function getUniqueTime() {
		//   	var time = new Date().getTime();
		//   	while (time == new Date().getTime());
		//   	return new Date().getTime();
		// }

		//this.id = $('#incident-id').value();

		console.log('this.id ' + this.id);

		//var isNewReport = false;
		//var id = $idField.val();

		// if there is no id
		// if (id == '') {
		// 	isNewReport = true;
		// 	$idField.val(timestamp);
		// }

		// grab or create a new store
		//this.store = amplify.store('canteenreport') || [];
		this.store = amplify.store(this.id);
		//this.store.push(this.getFormJSON());
		//amplify.store(this.id, this.getFormJSON());

		console.log(this.store);


		// todo: add edit functionality
		// if this is a new and unique report, push a new report into the store,
		// if not, get the store

		// if (isNewReport) {
		// 	var formdata = canteenreport.storage.getFormJSON();
		// 	canteenreport.storage.store.push(formdata);
		// 	amplify.store('canteenreport', formdata);
		// }

	},

	resetChanged: function () {

		canteenreport.app.log('storage.resetChanged');
		//amplify.store('canteen.changed', 0);

	},

	findReport: function () {

		canteenreport.app.log('storage.findReport');

		var store = canteenreport.storage.store;

		$.each(store, function (index, item) {
			console.log(item);
		});

	},

	/*
	doSave: function () {

		var s = this;
		s.intv = setInterval(function () {
			if (amplify.store('canteen.changed') == 1 && s.isOnline()) {
				s.saveForm();
			}
		}, 5000);

	},
	*/

	syncForm: function () {

		canteenreport.app.log('storage.syncForm');

		var unique = 0;
		var formdata = canteenreport.storage.getFormJSON();

		console.log(formdata);

		// save to the local store
		//canteenreport.storage.store.push(formdata);

		// save to the a
		amplify.store('canteenreport', canteenreport.storage.store);

		amplify.publish('canteenreport-saved');

		// amplify.request('pushData', { employees: amplify.store('employees') }, function (data) {
		// 	amplify.publish('employee-data-pushed', data);
		// });

		// amplify.publish('employee-created', employee);

		/*
		var unique = $('#form').attr('data-unique');

		if (amplify.store(unique) !== null) {

			this.data.report[unique] = amplify.store(unique);

			for (var key in this.data.report[unique]) {
				if (this.data.report[unique].hasOwnProperty(key)) {
					this.field(this.data.report[unique][key].name, this.data.report[unique][key].value);
				}
			}

		}
		*/

	},

	/*
	saveForm: function () {

		canteenreport.app.log('storage.saveForm');

		var unique = 0,
			formdata = this.getFormJSON();

		console.log(formdata)

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

			// if (unique == 0) {
			// 	// Save
			// 	this.save(formdata, true);
			// } else {
			// 	// Save
			// 	this.save(formdata, false);
			// }

		} else {

			// Save and Initilize
			this.save(formdata, true);

		}

		// amplify.store(unique, null);

	},
	*/

	// save: function (data, init) {

	// 	canteenreport.app.log('storage.save');

	// 	var id,
	// 		msg
	// 		s = this;

	// 	if (s.isOnline()) {

	// 		$.ajax({
	// 			url: 'http://23.239.8.146/backend-code/index.php/canteen/add',
	// 			type: 'POST',
	// 			data: data,
	// 			dataType: 'text',
	// 			success: function (res, status, xhr) {

	// 				// console.log("I am here");

	// 				var result = res.split(':');

	// 				msg = result[0];
	// 				id = result[1];

	// 				// console.log(result, msg, id);
	// 				// console.log('ajaxed');

	// 				if ("success" == msg) {

	// 					// console.log('successful');

	// 					if (init) {

	// 						// console.log('making input');

	// 						s.setupIDandDate(id);

	// 						$('#form').attr('data-unique', id);

	// 						amplify.store('active', id);
	// 						amplify.store(0, null);
	// 					}

	// 					// console.log('resetting?');
	// 					s.resetChanged();

	// 				}
	// 			},
	// 			error: function (a, b, c) {
	// 				console.log(a, b, c);
	// 			}
	// 		}).done(function () {

	// 			data = s.getFormJSON();

	// 			// console.log("amplify", id, data);

	// 			amplify.store(id, data);

	// 		});

	// 	} else {

	// 		id = $('#form').attr('data-unique');

	// 		data = s.getFormJSON();

	// 		// console.log("amplify", id, data);

	// 		amplify.store(id, data);

	// 	}

	// },

	setupIDandDate: function (id) {

		canteenreport.app.log('storage.setupIDandDate');

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

		if (id != null) {

			var $field = $('#' + id);

			if ($field.length == 0) {

				if (id.indexOf('team-member') != -1) {
					if (id != 'team-member-1') {
						var d = id.split('-');
						canteenreport.form.addNewMember(d[2], value);
					}
				}

			}

			// Text field
			if ($field.is('textarea')) {

				if ($field.val() !== value) {
					$field.val(value);
				}

			}

			// Text field
			if ($field.is('input[type=text]')) {

				if ($field.attr('id').indexOf('team-member') != -1) {
					if ($field.attr('id') != 'team-member-1') {
						var id = $field.attr('id').split('-');

						// console.log('ATTEMPTING TO ADD MEMBER', id[2], value);

						canteenreport.form.addNewMember(id[2], value);
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

				if ($field.val() !== value) {
					$field.val(value);
				}

			}

			// Checkbox
			if ($field.is('input[type=checkbox]')) {

				if ($field.attr('checked') !== 'checked') {
					$field.attr('checked', 'checked');
				}

			}

			// Select
			if ($field.is('select')) {

				if ($field.val() !== value) {
					$field.val(value);
				}

			}

			// DateTime
			if ($field.is('input[type=datetime-local]')) {

				if ($field.val() !== value) {
					$field.val(value);
				}

			}

		}
	},

	getFormJSON: function () {
		return JSON.parse(JSON.stringify($('#form').serializeArray()));
	},

	// getFormJSONString: function () {
	// 	return JSON.stringify($('#form').serializeArray());
	// },

	isOnline: function () {
		return navigator.onLine;
	},

	data: {
		report: []
	}

}
