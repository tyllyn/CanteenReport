/*global jQuery:false */
/*global canteenreport:false */
/*global amplify:false */
/*global $:false */

(function (canteenreport, undefined) {

	'use strict';

	var API_URL = 'http://72.22.29.60/Canteen/add';
    var BACKUP_STORE_NAME = 'canteenReportBackupStore';
    var ACTIVE_REPORT_STORE_NAME = 'canteenReportActiveStore';

    var currentReportId;

    // return the public api
	var storage = canteenreport.storage = function () {
		return;
	};

	function getFormJson() {

		console.info('getFormJson');

		var formValues = $('#form').serializeArray();
        var formValuesJSON = JSON.parse(JSON.stringify(formValues));

        return formValuesJSON;

	}

	/**
	* Called when the report is closed before submitting.
    */
    function backupReport() {

		//console.group('backupReport');
        console.log('backupReport');

        var formStore = amplify.store(ACTIVE_REPORT_STORE_NAME);
        var formBackupStore = amplify.store(BACKUP_STORE_NAME);
        var formBackupArray = [];
        var formBackupJSON;

        var formId = $('#incident-id').val();
        //var isBackedUp = typeof storage.findBackupFormById(formId) !== 'undefined' ? true : false;
        var isBackedUp = typeof storage.findBackupFormById(formId) !== 'undefined' ? true : false;

        console.log('incident-id: ' + formId);
        console.log('isBackedUp: ' + isBackedUp);

        if (typeof formBackupStore !== 'undefined') {
            formBackupArray = formBackupStore;
        }

        if (isBackedUp === true) {

            console.log('this report already exists. replace its backup.');
            var index = storage.findBackupFormIndexById(formId);
            formBackupArray[index] = formStore;

        } else {

            console.log('this report has not been backed up yet.');
            formBackupArray.push(formStore);

        }

        console.log(formBackupArray);

        amplify.store(BACKUP_STORE_NAME, formBackupArray);

    }


    //
    // Private Functions
    //


	/**
	 * Submit the active report
	 */
	storage.submitReport = function () {

		console.log('submitReport');

		var formValuesJSON = getFormJson();
        currentReportId = $('#incident-id').val();

        console.log(formValuesJSON);
        console.log('currentReportId: ' + currentReportId);

        $.ajax({
            crossDomain: true,
            type: 'POST',
            url: API_URL,
            data: formValuesJSON
        }).done(function () {

            $.publish('report-submitted', {
                id: currentReportId
            });

        }).fail(function (jqXHR, textStatus) {

            console.log(jqXHR);
            console.log(textStatus);

            $.publish('report-error', {
                jqXHR: jqXHR,
                textStatus: textStatus
            });

        });

	};


	/**
	 */
	storage.newReport = function () {

		//console.info('storage.newReport');
		amplify.store(ACTIVE_REPORT_STORE_NAME, {});

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

		console.group('storage.syncReport');
        console.log(formValuesJSON);
        console.groupEnd();

        amplify.store(ACTIVE_REPORT_STORE_NAME, formValuesJSON);
        amplify.publish('report-saved');

	};

    /**
     * Deletes a report by its id
     */
    storage.deleteReport = function (id) {

        console.log('storage.deleteReport ' + id);

        if (typeof id === 'undefined') {
            id = currentReportId;
        }

        var formBackupStore = amplify.store(BACKUP_STORE_NAME);
        var formBackupArray = [];

        if (typeof formBackupStore !== 'undefined') {
            formBackupArray = formBackupStore;
        }

        if (formBackupArray.length > 0) {

            $.each(formBackupArray, function (index, value) {
                if (value.length > 0) {

                    var backedUpFormId = value[0].value;

                    if (backedUpFormId === id) {
                        formBackupArray.splice(index, 1);
                        amplify.store(BACKUP_STORE_NAME, formBackupArray);
                        $.publish('report-deleted');
                        return;
                    }
                }
            });

        }

    };

	/**
	 * Saves the current report
	 */
	storage.saveReport = function () {

        console.log('saveReport');
		backupReport();

	};

    /**
     */
    storage.getBackedUpReports = function () {

        return amplify.store(BACKUP_STORE_NAME);

    };

	/**
     * Will find a backed up form by its ID
     */
	storage.findBackupFormById = function (id) {

        console.log('findBackupFormById ' + id);

		var formBackupStore = amplify.store(BACKUP_STORE_NAME);
		var formBackup;

		if (typeof formBackupStore !== 'undefined') {

			$.each(formBackupStore, function (index, value) {

				if (value.length > 0) {
					var backedUpFormId = value[0].value;
					if (backedUpFormId == id) {
                        console.log('found the backup!');
						formBackup = value;
						return;
					}
				}

			});

		}

		return formBackup;

    };

    /**
     */
    storage.findBackupFormIndexById = function (id) {

        var formBackupStore = amplify.store(BACKUP_STORE_NAME);
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
