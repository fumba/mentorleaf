angular.module('edifyStars', []).
filter('capitalize', function() {
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