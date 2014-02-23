var app = angular.module('SalvationArmy',[]);

app.controller('home', function($scope, $http){
	$scope.formData = {};

	$scope.searchReports = function(){
		$http.get('/backend-code/index.php/admin/report?'+$.param($scope.formData))
			 .success(function(data){
			 	if(data.status == 'No Results.'){
			 		$scope.noResults = true;
			 	}else{
			 		$.each(data, function(i){
				 		if(data[i].incident_type_fire != null){
				 			data[i].incident_type = 'Fire'
				 		}else if(data[i].incident_other != null || data[i].incident_type_other != null){
				 			data[i].incident_type = 'Other';
				 		}else if(data[i].incident_type_hazmat){
				 			data[i].incident_type = 'Hazmat';
				 		}else if(data[i].incident_type_maintenence != null){
				 			data[i].incident_type = 'Maintenence';
				 		}else if(data[i].incident_type_flood != null){
				 			data[i].incident_type = 'Flood';
				 		}else if(data[i].incident_type_special_event != null){
				 			data[i].incident_type = 'Special Event';
				 		}else{
				 			data[i].incident_type = 'N/A';
				 		}
			 		})
			 		$scope.noResults = false;
			 		console.log(data)
			 	}
			 	$scope.reports = data;
			 })
	}
})

/*

"incident_type_fire": null,
"incident_other": null,
"incident_type_hazmat": null,
"incident_type_maintenence": null,
"incident_type_flood": null,
"incident_type_special_event": null,
"incident_type_other": null,
*/