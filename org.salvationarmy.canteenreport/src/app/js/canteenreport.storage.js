(function( canteenreport, undefined) {

	'use strict';

	var initialized = false;

	var store;
	var apiUrl = 'http://23.239.8.146/backend-code/index.php/canteen/add';
	var id = '23';

	var storage = canteenreport.storage = function () {
		return;
	}

	storage.newReport = function () {

		console.log(canteenreport.BACKUP_STORE_NAME)

		amplify.store(canteenreport.ACTIVE_REPORT_STORE_NAME, {});

	}

	/**
	 * Syncs the form on demand or when the form is focused or blurred
	 */
	storage.syncReport = function () {

		var formValues = $('#form').serializeArray();
        var formValuesJSON = JSON.parse(JSON.stringify(formValues));

		console.group('storage.syncReport');
        console.log(formValuesJSON);
        console.groupEnd();

        amplify.store(canteenreport.ACTIVE_REPORT_STORE_NAME, formValuesJSON);
        amplify.publish('report-saved');

	}

	/**
	 * Saves the report.
	 */
	storage.saveReport = function () {

		console.group('saveReport');
		backupReport();
		console.groupEnd();

	}

	/**
	 * Called when the report is closed before submitting.
     */
    function backupReport () {

    	console.group('backupReport');

        var formStore = amplify.store(canteenreport.ACTIVE_REPORT_STORE_NAME);
        var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
        var formBackupArray = [];
        var formBackupJSON;

        var formId = $('#incident-id').val();
        var isBackedUp = typeof storage.findBackupFormById(formId) !== 'undefined' ? true : false;

        console.info('incident-id: ' + formId);

        if (typeof formBackupStore !== 'undefined') {
            formBackupArray = formBackupStore;
        }

        if (isBackedUp == true) {

            console.info('this report already exists. replace its backup.');

            var index = storage.findBackupFormIndexById(formId);
            formBackupArray[index] = formStore;

        } else {

            console.info('this report has not been backed up yet.');
            formBackupArray.push(formStore);

        }

        console.log(formBackupArray);

        amplify.store(canteenreport.BACKUP_STORE_NAME, formBackupArray);

        console.groupEnd();

    }

	/**
     * Will find a backed up form by its ID
     */
    storage.findBackupFormById = function (id) {

    	console.group('storage.findBackupFormById: ' + id);

        var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
        var formBackup;

        console.log(formBackupStore);

        if (formBackupStore != null) {
	        $.each(formBackupStore, function (index, value) {
	            var backedUpFormId = value[0].value;
	            if (backedUpFormId == id) {
	                formBackup = value;
	                return;
	            }
	        });
	    }

	    console.groupEnd();

        return formBackup;

    }

    storage.findBackupFormIndexById = function (id) {

        var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
        var backupIndex;

        $.each(formBackupStore, function (index, value) {
            var backedUpFormId = value[0].value;
            if (backedUpFormId == id) {
                backupIndex = index;
                return;
            }
        });

        return backupIndex;

    }

	// canteenreport.storage = {

	// 	initialize: function () {

	// 		canteenreport.log('storage.initialize');

	// 		// var timestamp = function getUniqueTime() {
	// 		//   	var time = new Date().getTime();
	// 		//   	while (time == new Date().getTime());
	// 		//   	return new Date().getTime();
	// 		// }

	// 		//this.id = $('#incident-id').value();

	// 		console.log('this.id ' + this.id);

	// 		//var isNewReport = false;
	// 		//var id = $idField.val();

	// 		// if there is no id
	// 		// if (id == '') {
	// 		// 	isNewReport = true;
	// 		// 	$idField.val(timestamp);
	// 		// }

	// 		// grab or create a new store
	// 		//this.store = amplify.store('canteenreport') || [];
	// 		this.store = amplify.store(this.id);
	// 		//this.store.push(this.getFormJSON());
	// 		//amplify.store(this.id, this.getFormJSON());

	// 		console.log(this.store);


	// 		// todo: add edit functionality
	// 		// if this is a new and unique report, push a new report into the store,
	// 		// if not, get the store

	// 		// if (isNewReport) {
	// 		// 	var formdata = canteenreport.storage.getFormJSON();
	// 		// 	canteenreport.storage.store.push(formdata);
	// 		// 	amplify.store('canteenreport', formdata);
	// 		// }

	// 	},

	// 	resetChanged: function () {

	// 		canteenreport.log('storage.resetChanged');
	// 		//amplify.store('canteen.changed', 0);

	// 	},

	// 	findReport: function () {

	// 		canteenreport.log('storage.findReport');

	// 		var store = canteenreport.storage.store;

	// 		$.each(store, function (index, item) {
	// 			console.log(item);
	// 		});

	// 	},

	// 	syncForm: function () {

	// 		canteenreport.log('storage.syncForm');

	// 		var unique = 0;
	// 		var formdata = canteenreport.storage.getFormJSON();

	// 		console.log(formdata);

	// 		// save to the local store
	// 		//canteenreport.storage.store.push(formdata);

	// 		// save to the a
	// 		amplify.store('canteenreport', canteenreport.storage.store);

	// 		amplify.publish('canteenreport-saved');

	// 	},

	// 	save: function (data, init) {

	// 		canteenreport.log('storage.save');

	// 		var id,
	// 			msg
	// 			s = this;

	// 		if (s.isOnline()) {

	// 			$.ajax({
	// 				url: 'http://23.239.8.146/backend-code/index.php/canteen/add',
	// 				type: 'POST',
	// 				data: data,
	// 				dataType: 'text',
	// 				success: function (res, status, xhr) {

	// 					// console.log("I am here");

	// 					var result = res.split(':');

	// 					msg = result[0];
	// 					id = result[1];

	// 					// console.log(result, msg, id);
	// 					// console.log('ajaxed');

	// 					if ("success" == msg) {

	// 						// console.log('successful');

	// 						if (init) {

	// 							// console.log('making input');

	// 							s.setupIDandDate(id);

	// 							$('#form').attr('data-unique', id);

	// 							amplify.store('active', id);
	// 							amplify.store(0, null);
	// 						}

	// 						// console.log('resetting?');
	// 						s.resetChanged();

	// 					}
	// 				},
	// 				error: function (a, b, c) {
	// 					console.log(a, b, c);
	// 				}
	// 			}).done(function () {

	// 				data = s.getFormJSON();

	// 				// console.log("amplify", id, data);

	// 				amplify.store(id, data);

	// 			});

	// 		} else {

	// 			id = $('#form').attr('data-unique');

	// 			data = s.getFormJSON();

	// 			// console.log("amplify", id, data);

	// 			amplify.store(id, data);

	// 		}

	// 	},

	// 	setupIDandDate: function (id) {

	// 		canteenreport.log('storage.setupIDandDate');

	// 		$('<input />')
	// 			.attr('type', 'hidden')
	// 			.attr('id', 'id')
	// 			.attr('name', 'id')
	// 			.val(id)
	// 			.appendTo($('#form'));

	// 		var date = new Date();

	// 		$('<input />')
	// 			.attr('type', 'hidden')
	// 			.attr('id', 'date')
	// 			.attr('name', 'date')
	// 			.val(date.getTime())
	// 			.appendTo($('#form'));

	// 	},

	// 	field: function (id, value) {

	// 		if (id != null) {

	// 			var $field = $('#' + id);

	// 			if ($field.length == 0) {

	// 				if (id.indexOf('team-member') != -1) {
	// 					if (id != 'team-member-1') {
	// 						var d = id.split('-');
	// 						canteenreport.form.addNewMember(d[2], value);
	// 					}
	// 				}

	// 			}

	// 			// Text field
	// 			if ($field.is('textarea')) {

	// 				if ($field.val() !== value) {
	// 					$field.val(value);
	// 				}

	// 			}

	// 			// Text field
	// 			if ($field.is('input[type=text]')) {

	// 				if ($field.attr('id').indexOf('team-member') != -1) {
	// 					if ($field.attr('id') != 'team-member-1') {
	// 						var id = $field.attr('id').split('-');

	// 						// console.log('ATTEMPTING TO ADD MEMBER', id[2], value);

	// 						canteenreport.form.addNewMember(id[2], value);
	// 					} else {
	// 						if ($field.val() !== value) {
	// 							$field.val(value);
	// 						}
	// 					}
	// 				} else {

	// 					// console.log($field.val(), value);
	// 					if ($field.val() !== value) {
	// 						$field.val(value);
	// 					}

	// 				}

	// 			}

	// 			// Number field
	// 			if ($field.is('input[type=number]')) {

	// 				if ($field.val() !== value) {
	// 					$field.val(value);
	// 				}

	// 			}

	// 			// Checkbox
	// 			if ($field.is('input[type=checkbox]')) {

	// 				if ($field.attr('checked') !== 'checked') {
	// 					$field.attr('checked', 'checked');
	// 				}

	// 			}

	// 			// Select
	// 			if ($field.is('select')) {

	// 				if ($field.val() !== value) {
	// 					$field.val(value);
	// 				}

	// 			}

	// 			// DateTime
	// 			if ($field.is('input[type=datetime-local]')) {

	// 				if ($field.val() !== value) {
	// 					$field.val(value);
	// 				}

	// 			}

	// 		}
	// 	},

	// 	getFormJSON: function () {
	// 		return JSON.parse(JSON.stringify($('#form').serializeArray()));
	// 	},

	// 	// getFormJSONString: function () {
	// 	// 	return JSON.stringify($('#form').serializeArray());
	// 	// },

	// 	isOnline: function () {
	// 		return navigator.onLine;
	// 	},

	// 	data: {
	// 		report: []
	// 	}

	// }

}( canteenreport, jQuery ));