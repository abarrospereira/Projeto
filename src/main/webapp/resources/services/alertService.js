
(function () {
    'use strict';

    angular.module('les-notification-dialog',[]).factory('alertService', alertService);

    alertService.$inject = ['toaster', '$translate'];

    function alertService(toaster, $translate) {
        var alertService = {
            error: error,
            success: success,
            info: info,
            warning: warning
        };

        function error(message) {
            toaster.pop('error', $translate.instant(message.text));
        }

        function success(message) {
            toaster.pop({
                type: 'success',
                id: 'infoId',
                title: $translate.instant(message.title),
                body: $translate.instant(message.text),
                timeout: 5000
            });
        }

        function info(message) {
            toaster.pop('info', $translate.instant(message.text, message.parameters));
        }

        function warning(message) {
            toaster.pop('warning', $translate.instant(message.text, message.parameters), 5000);
        }

        return alertService;
    }
})();