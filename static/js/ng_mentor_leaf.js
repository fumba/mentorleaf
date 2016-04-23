var app = angular.module('ngMentorLeaf', []);

app.filter('capitalize', function() {
	return function(input, all) {
		var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
		return (!!input) ? input.replace(reg, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}) : '';
	}
});

function CollectUserData($scope, $http) {
	$http.get('user/profile').success(function(data, status, headers, config) {

		$scope.user = data;
		$scope.error = "";
	}).error(function(data, status, headers, config) {
		$scope.user = {};
		$scope.error = data;
	});

}

app
		.controller(
				'searchController',
				[
						'$scope',
						'$http',
						'$window',
						function($scope, $http, $window) {

							$scope.add_btn_title = "Add Connection";

							$scope.majors = [ {
								value : 'Biology',
								label : 'Biology'
							}, {
								value : 'Accounting',
								label : 'Accounting'
							} ];

							// Perform user search
							$scope.performProfileSearch = function() {

								if ($scope.selectedMajor != null) {
									alert($scope.selectedMajor.value);
								}

								$http.post('/profiles/get', {
									params : {
										user_id : "test",
										user : $scope.user
									}
								})
										.success(
												function(data, status, headers,
														config) {
													$scope.profiles = data;
													$scope.profile = data[0];
												}).error(
												function(data, status, headers,
														config) {
													// TODO display error
													// message
													$scope.profiles = [];
												});
							};

							// Set page content
							$scope.setContent = function(filename) {
								$scope.content = '/static/' + filename;
							};

							// Add connection
							$scope.connectWithProfile = function(user) {
								$http
										.post('/profiles/add')
										.success(
												function(data, status, headers,
														config) {
													$scope.add_btn_title = $scope.add_btn_title == "Add Connection" ? "Cancel Request"
															: "Add Connection";
												}).error(
												function(data, status, headers,
														config) {

												});
							};

						} ]);

app.controller('surveyController', [ '$scope', '$http', '$window',
		function($scope, $http, $window) {
			
			$scope.majors = [ {
				value : 'Biology',
				label : 'Biology'
			}, {
				value : 'Accounting',
				label : 'Accounting'
			} ];

		} ]);

app.controller('navigationController', [ '$scope', '$http', '$window',
		function($scope, $http, $window) {

			$scope.setContent = function(filename) {
				$scope.content = '/static/' + filename;
			};

		} ]);

app.filter('capitalize', function() {
	return function(input) {
		return (!!input) ? input.charAt(0).toUpperCase()
				+ input.substr(1).toLowerCase() : '';
	}
});