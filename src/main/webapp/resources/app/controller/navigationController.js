

    (function () {
        'use strict';

        angular.module('Koulu').controller('navigationController', navigationController);

        navigationController.$inject = ['$scope', '$location'];

        function navigationController($scope, $http, usuarioService, alertService, blockUi) {

            $scope.onToggle = function () {

                if ($("#corpo").hasClass("sidebar-collapse sidebar-open")) {
                    $("#corpo").removeClass("sidebar-collapse sidebar-open");
                } else {
                    $("#corpo").addClass("sidebar-collapse sidebar-open");
                }
            };
           

        }
    })();