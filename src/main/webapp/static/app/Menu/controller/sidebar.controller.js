
(function () {
    'use strict';

    angular.module('app').controller('sidebarController', sidebarController);

    sidebarController.$inject = ['$scope', '$location','blockUI'];

    function sidebarController($scope,$location,blockUI) {


    	
        $scope.state = false;
        
        $scope.toggleState = function() {
            $scope.state = !$scope.state;
        };
       

    }
})();