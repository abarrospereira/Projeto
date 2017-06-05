
(function () {
    'use strict';

    angular.module('app.grid.service', ['datatables']).factory('gridService', gridService);

    gridService.$inject = ['$http', '$state', 'DTOptionsBuilder', 'DTColumnBuilder', '$q'];

    function gridService($http, $state,  DTOptionsBuilder, DTColumnBuilder,$q) {
        var gridService = {
            gridResult: gridResult,
            gridData: gridData,
            gridColumns: gridColumns

        };

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function gridData(entidade, fields) {
            var deferred = $q.defer();

            $http.get('http://localhost:8080/Projeto/' + entidade).then(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function gridResult(entidade,fields) {

            return DTOptionsBuilder.newOptions()
               .withOption('ajax', function (data, fnCallback, settings) {
            	   var api = this.api();
                   var pgNo = api.page.info();
                   
            	   var parameters = {
                       draw: data.draw,
                       start:  pgNo.page,
                       length: data.length
//                       dir: data.order[0].dir,
//                       Field: data.columns[data.order[0].column].name,
//                       FieldFilter: fields,
//                       Value: data.search.value,
                   };
                   var config = {
                       params: parameters
                   };

                   var request = JSON.stringify(config);
                   request = encodeURIComponent(request);

                   $http.get('http://localhost:8080/Projeto/' + entidade + '?', config).then(function (response) {
                       fnCallback(response.data);
                   });
               })
                .withDataProp(function (json) {
                    json.data = json.data;
                    json.recordsTotal = json.recordsTotal;
                    json.recordsFiltered = json.recordsFiltered;

                    return json.data;
                })
              .withOption('processing', true)
              .withOption('bFilter', false) // for server side processing
              .withOption('serverSide', true) // for server side processing
              .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
              .withDisplayLength(10) // Page size
              .withOption('aaSorting', [0, 'asc']); // for default sorting column // here 0 means first column

        }

        function gridColumns(route, columns) {
        	
        	  var tmpCol = [];
        	  
        	  angular.forEach(columns, function (value, key) {
                  tmpCol.push(DTColumnBuilder.newColumn(value).withTitle(value));
              });
             
                tmpCol.push(DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '9%').renderWith(function (data, type, full, meta) {

                    return '<button class="btn btn-warning" ng-click="typeOcorrencyListCtrl.edit(' + data.id + ')">' +
                             '   <i class="fa fa-edit"></i>' +
                             '</button>&nbsp;' +
                             '<button class="btn btn-danger" ng-click="typeOcorrencyListCtrl.delete(' + data.id + ')">' +
                             '   <i class="fa fa-trash-o"></i>' +
                             '</button>';

                }));
                
                return tmpCol;
            
        }


        return gridService;

    }
})();



