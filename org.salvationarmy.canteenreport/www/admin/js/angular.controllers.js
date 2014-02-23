var app = angular.module('SalvationArmy',[]);

app.controller('home', function($scope, $http){
	$scope.formData = {};

	$scope.searchReports = function(){
		console.log('/codefest/backend-code/index.php/admin/report?'+$.param($scope.formData));
		$http.get('/codefest/backend-code/index.php/admin/report?'+$.param($scope.formData))
			 .success(function(data){
			 	if(data.status == 'No Results.'){
			 		$scope.noResults = true;
			 	}else{
			 		$scope.noResults = false;
			 	}
			 	$scope.reports = data;
			 })
	}
})