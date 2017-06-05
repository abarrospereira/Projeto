
(function () {
    'use strict';

    angular.module('app').factory('flashService', flashService);

    flashService.$inject = ['Flash'];

    function flashService(Flash) {
        var flashService = {
            error: error,
            success: success,
            info: info,
            warning: warning
        };

        function error(message) {
            var text = '<h4><i class="icon fa fa-ban"></i> ' + message.title + '</h4> ' + (message.text);
            return Flash.create('error', text, 10000, { class: 'callout callout-danger', id: 'custom-id' }, true);
        }

        function success(message) {
            var text = '<h4><i class="icon fa fa-check"></i> ' + message.title + '</h4> ' + (message.text);
            return Flash.create('success', text, 5000, { class: 'callout callout-success', id: 'custom-id' }, true);
        }

        function info(message) {
            var text = '<h4><i class="icon fa fa-info"></i> ' + message.title + '</h4> ' + (message.text);
            return Flash.create('info', text, 5000, { class: 'callout callout-info', id: 'custom-id' }, true);
        }

        function warning(message) {
            var text = '<h4><i class="icon fa fa-warning"></i> ' + message.title + '</h4> ' + (message.text);
            return Flash.create('warning', text, 5000, { class: 'callout callout-warning', id: 'custom-id' }, true);
        }

        return flashService;
    }

})();



