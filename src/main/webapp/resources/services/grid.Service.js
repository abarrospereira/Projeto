
(function () {
    'use strict';

    angular.module('Koulu.grid.service', ['datatables']).factory('gridService', gridService);

    gridService.$inject = ['$http', '$state', 'DTOptionsBuilder', 'DTColumnBuilder', 'localeService', '$q'];

    function gridService($http, $state,  DTOptionsBuilder, DTColumnBuilder, localeService,$q) {
        var gridService = {
            gridResult: gridResult,
            gridData: gridData

        };

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function gridData(entidade, fields) {
            var deferred = $q.defer();

            $http.get('http://localhost:53955/api/' + entidade).then(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function gridResult(entidade,fields) {

            return DTOptionsBuilder.newOptions()
               .withOption('ajax', function (data, fnCallback, settings) {
                   var parameters = {
                       draw: data.draw,
                       start: data.start,
                       length: data.length,
                       dir: data.order[0].dir,
                       instituicaoId: localeService.getInstituicao().id,
                       Field: data.columns[data.order[0].column].name,
                       FieldFilter: fields,
                       Value: data.search.value,
                   };
                   var config = {
                       params: parameters
                   };

                   var request = JSON.stringify(config);
                   request = encodeURIComponent(request);

                   $http.get('http://localhost:53955/api/' + entidade + '/filter', config).then(function (response) {
                       fnCallback(response.data.Data);
                   });
               })
                .withDataProp(function (json) {
                    json.data = json.data;
                    json.recordsTotal = json.recordsFiltered;
                    json.recordsFiltered = json.recordsFiltered;

                    return json.data;
                })
              .withOption('processing', true)
              .withOption('serverSide', true) // for server side processing
                .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
                .withDisplayLength(10) // Page size
                .withOption('aaSorting', [0, 'asc']); // for default sorting column // here 0 means first column

        }




        return gridService;

    }
})();



