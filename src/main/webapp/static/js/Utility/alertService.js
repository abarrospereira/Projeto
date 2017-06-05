
(function () {
    'use strict';

    angular.module('app').factory('alertService', alertService);

    alertService.$inject = ['toaster','$sce'];

    function alertService(toaster,$sce) {
        var alertService = {
            error: error,
            success: success,
            info: info,
            warning: warning
        };

        function error(message) {
            toaster.pop('error', message.title, $sce.trustAsHtml(message.text));
        }

        function success(message) {
        	toaster.pop('success',message.title, $sce.trustAsHtml(message.text));
        }

        function info(message) {
            toaster.pop('info',message.title, $sce.trustAsHtml(message.text));
        }

        function warning(message) {
            toaster.pop('warning',message.title, $sce.trustAsHtml(message.text), 5000);
        }

        return alertService;
    }
})();