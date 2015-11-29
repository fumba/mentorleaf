'use strict';
angular.module('edifyApp', ['edifyApp.directives']);

/* Controllers */
function stageController($scope) {
    //$scope.signupEmail = 'Email...';
}

/* Directives */
angular.module('edifyApp.directives', [])
    .directive('emailCheck', [ function () {
		
    return {		
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstEmail = '#' + attrs.emailCheck;
			
            elem.add(firstEmail).on('keyup', function () {
                scope.$apply(function () {
                    console.info(elem.val() === $(firstEmail).val());
                    ctrl.$setValidity('emailmatch', elem.val() === $(firstEmail).val());
					//scope.emailmatch = 'true';
                });
            });
        }
		
    }
}]);