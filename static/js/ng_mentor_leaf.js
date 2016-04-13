var app = angular.module('ngMentorLeaf', []);

app.filter('capitalize', function() {
return function(input, all) {
	var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
	return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
}
});


function CollectUserData($scope, $http) {
$http.get('user/profile')
	.success(function(data, status, headers, config) {

	$scope.user = data;
	$scope.error = "";
}).
error(function(data, status, headers, config) {
	$scope.user = {};
	$scope.error = data;
}); 

}


app.controller('searchController', ['$scope', '$http', '$window', function($scope, $http, $window) {
	
    $scope.performProfileSearch = function(){
		$http.get('/profiles/get').success(function(data, status, headers, config) {
			$scope.profiles = data;
			$scope.profile = data[0];
		}).error(function(data, status, headers, config) {
			//TODO display error message
			$scope.profiles = [];
		});
    };
	
	$scope.setContent = function(filename){
      $scope.content = '/static/'+ filename;
    };
	
 }]);