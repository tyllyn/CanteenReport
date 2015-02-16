/*global jQuery:false */
/*global canteenreport:false */
/*global amplify:false */
/*global $:false */

(function (canteenreport, undefined) {

	'use strict';

	var apiUrl = 'http://72.22.29.60/Canteen/add';

	var storage = canteenreport.storage = function () {
		return;
	};

	function getFormJson() {

		//console.info('getFormJson');

		var formValues = $('#form').serializeArray();
        var formValuesJSON = JSON.parse(JSON.stringify(formValues));

        return formValuesJSON;

	}

	/**
	* Called when the report is closed before submitting.
    */
    function backupReport() {

		//console.group('backupReport');

        var formStore = amplify.store(canteenreport.ACTIVE_REPORT_STORE_NAME);
        var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
        var formBackupArray = [];
        //var formBackupJSON;

        var formId = $('#incident-id').val();
        var isBackedUp = typeof storage.findBackupFormById(formId) !== 'undefined' ? true : false;

        //console.info('incident-id: ' + formId);

        if (typeof formBackupStore !== 'undefined') {
            formBackupArray = formBackupStore;
        }

        if (isBackedUp === true) {

            //console.info('this report already exists. replace its backup.');

            var index = storage.findBackupFormIndexById(formId);
            formBackupArray[index] = formStore;

        } else {

            //console.info('this report has not been backed up yet.');
            formBackupArray.push(formStore);

        }

        //console.log(formBackupArray);

        amplify.store(canteenreport.BACKUP_STORE_NAME, formBackupArray);

        //console.groupEnd();

    }


	/**
	 * Submit the active report
	 */
	storage.submitReport = function () {

		//console.group('submitReport');

		var formValuesJSON = getFormJson();

        $.ajax({
            crossDomain: true,
            type: 'POST',
            url: apiUrl,
            data: formValuesJSON
        }).done(function () {
            console.log('done');
        });

		//define the request
        // amplify.request.define(canteenreport.REPORT_REQUEST_NAME, 'ajax', {
        //     url: apiUrl,
        //     dataType: 'jsonp'
        //     type: 'POST'
        // });

        // execute the request
        // amplify.request(canteenreport.REPORT_REQUEST_NAME, formValuesJSON);

		//console.groupEnd('submitReport');

	};


	/**
	 */
	storage.newReport = function () {

		//console.info('storage.newReport');
		amplify.store(canteenreport.ACTIVE_REPORT_STORE_NAME, {});

	};

	/**
	 */
	storage.openReport = function () {

	};

	/**
	 * Syncs the form on demand or when the form is focused or blurred
	 */
	storage.syncReport = function () {

		// var formValues = $('#form').serializeArray();
		// var formValuesJSON = JSON.parse(JSON.stringify(formValues));
		var formValuesJSON = getFormJson();

		// console.group('storage.syncReport');
  //       console.log(formValuesJSON);
  //       console.groupEnd();

        amplify.store(canteenreport.ACTIVE_REPORT_STORE_NAME, formValuesJSON);
        amplify.publish('report-saved');

	};

    storage.deleteReport = function (id) {

        //console.group('storage.deleteReport: ' + id);

        var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
        var formBackupArray = [];
        //var formBackup;

        //console.log(formBackupStore);

        if (typeof formBackupStore !== 'undefined') {
            formBackupArray = formBackupStore;
        }

        if (formBackupArray.length > 0) {

            $.each(formBackupArray, function (index, value) {
                if (value.length > 0) {

                    var backedUpFormId = value[0].value;

                    if (backedUpFormId === id) {

                        //console.info('found the report at ' + index);

                        formBackupArray.splice(index, 1);
                        amplify.store(canteenreport.BACKUP_STORE_NAME, formBackupArray);
                        canteenreport.publish('report-deleted');


                        return;
                    }
                }
            });

        }

        //console.groupEnd();

    };

	/**
	 * Saves the report.
	 */
	storage.saveReport = function () {

		//console.group('saveReport');
		backupReport();
		//console.groupEnd();

	};

	/**
    * Will find a backed up form by its ID
    */
	storage.findBackupFormById = function (id) {

		//console.group('storage.findBackupFormById: ' + id);

		var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
		var formBackup;

		//console.log(formBackupStore);

		if (formBackupStore !== null) {
			$.each(formBackupStore, function (index, value) {

				if (value.length > 0) {

					var backedUpFormId = value[0].value;

					if (backedUpFormId == id) {
						formBackup = value;
						return;
					}

				}
			});
		}

		//console.groupEnd();

		return formBackup;

    };

    /**
     */
    storage.findBackupFormIndexById = function (id) {

        var formBackupStore = amplify.store(canteenreport.BACKUP_STORE_NAME);
        var backupIndex;

        $.each(formBackupStore, function (index, value) {

            if (value.length > 0) {
                var backedUpFormId = value[0].value;
                if (backedUpFormId == id) {
                    backupIndex = index;
                    return;
                }
            }
        });

        return backupIndex;

    };

}(canteenreport, jQuery));
