var app = angular.module('ngMentorLeaf', []);

// -- CUSTOM FILTER TO USE THROUGH MODULE
app.filter('capitalize', function() {
	return function(input) {
		return (!!input) ? input.charAt(0).toUpperCase()
				+ input.substr(1).toLowerCase() : '';
	}
});

// -- GLOBAL CONTROLLER
app.controller('globalController', [ '$scope', '$http', '$window',
		function($scope, $http, $window) {
			$scope.setContent = function(filename) {
				$scope.content = '/static/' + filename;
			};
		} ]);

// -- COLLECT USER DATA- DASHBOARD ACCESS
app.controller('collectUserData', [
		'$scope',
		'$http',
		'$window',
		function($scope, $http, $window) {

			// Get primary user data
			$http.get('user/profile').success(
					function(data, status, headers, config) {
						$scope.user = data;
						$scope.error = "";
					}).error(function(data, status, headers, config) {
				$scope.user = {};
				$scope.error = data;
			});

		} ]);

// -- COLLECT USER CONNECTIONS
app.controller('collectUserConnections', [ '$scope', '$http', '$window',
		function($scope, $http, $window) {

			// Get user connections
			$http.get('/get_connections', {
				params : {
					connection_ids : $scope.user.connections
				}
			}).success(function(data, status, headers, config) {
				$scope.connections = data;
				$scope.connection = data[0];
			}).error(function(data, status, headers, config) {
				$scope.connections = [];
			});

			// Remove Connection
			$scope.removeConnection = function(connection, index) {
				$http.get('/remove_connection', {
					params : {
						disconnect_profile_id : connection._id
					}
				}).success(function(data, status, headers, config) {
					// remove element from array
					$scope.connections.splice(index, 1);
					$scope.user.connections = data.connections;

				}).error(function(data, status, headers, config) {

				});
			};

		} ]);

// -- SEARCH FOR USERS - SEARCH PAGE
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
								value : '',
								label : ''
							}, {
								value : 'Biology',
								label : 'Biology'
							}, {
								value : 'Nursing',
								label : 'Nursing'
							} ];

							$scope.selectedMajor = $scope.majors[0];

							// Search for Profiles
							$scope.performProfileSearch = function() {

								var major = [ 'Biology', 'Nursing' ];
								if ($scope.selectedMajor.value) {
									major = [ $scope.selectedMajor.value ];
								}

								$http.post('/profiles/get', {
									params : {
										major : major,
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
													$scope.profiles = [];
												});
							};

							// Add new Connection
							$scope.connectWithProfile = function(user) {
								if ($scope.add_btn_title == "Add Connection") {
									$http
											.post(
													'/profiles/add',
													{
														params : {
															connect_profile_id : user._id
														}
													})
											.success(
													function(data, status,
															headers, config) {
														$scope.add_btn_title = $scope.add_btn_title == "Add Connection" ? "Cancel Request"
																: "Add Connection";
													}).error(
													function(data, status,
															headers, config) {

													});
								}
							};

							// -- Helper fn to check of the user is a connection
							$scope.isConnection = function(item, array) {
								return (-1 !== array.indexOf(item));
							};

						} ]);

// -- SURVEY SCREEN COMPONENT POPULATION
app.controller('surveyController', [ '$scope', '$http', '$window',
		function($scope, $http, $window) {

			$scope.majors = [ {
				value : 'Biology',
				label : 'Biology'
			}, {
				value : 'Nursing',
				label : 'Nursing'
			} ];

		} ]);

// -- DASHBOARD NAVIGATION CONTROLLER
app.controller('navigationController', [ '$scope', '$http', '$window',
		function($scope, $http, $window) {

		} ]);