
(function () {
    'use strict';

    angular.module('app').controller('typeOcorrencyListController', typeOcorrencyListController);

    typeOcorrencyListController.$inject = ['$uibModal',
                                           '$state',
                                           '$scope',
                                           '$location',
                                           '$compile',
                                           'typeOcorrencyService',
                                           'DTOptionsBuilder',
                                           'DTColumnBuilder',
                                           'gridService',
                                           'alertService',
                                           'blockUI'];

    function typeOcorrencyListController($uibModal,$state,$scope,$location,$compile,typeOcorrencyService,DTOptionsBuilder,DTColumnBuilder,gridService,alertService,blockUI) {

    	var self = this;
    	
    	self.delete = deleteRow;
    	self.dtInstance = {};
    	activate();
    	
    	
    	function activate() {
    		Grid();
    	}
    	
    	self.salvar = function () {

    		blockUI.start();
			var typeOcorrency = self.typeOcorrency;

			typeOcorrencyService.save(typeOcorrency).then(function (result) {
				self.typeOcorrency = null;
				self.reset();
				blockUI.stop();
			});

		}
    	
    	self.novo = function () {
    		$state.go("contacts.form");
    	}
    	
    	self.edit = function(id) {
            $state.go("contacts.edit", {id : id });
    	}
    	
    	
    	 function deleteRow(id) {

             if (id != undefined) {
                 var modalInstance = $uibModal.open({
                     templateUrl: 'static/app/Shared/modal.delete.html',
                     controller: 'customers.modal'
                 });

                 modalInstance.result.then(function () {
                     blockUI.start();

                     typeOcorrencyService.deleteTypeOcorrency(id).then(function (result) {
                         self.dtInstance._renderer.rerender();
                     });

                     alertService.success({ title: 'Sucesso', text: 'Registro excluído com sucesso' });
                     blockUI.stop();
                     
                     
                 });
             }
     }
    	 
    	function Grid() {

    		  var fields = ['id','name'];
    		  
             $scope.dtColumns = gridService.gridColumns('curso',fields);
             $scope.dtOptions = gridService.gridResult('type-ocorrencies', fields).withOption('createdRow', createdRow);;
         }
    	 
    	 function createdRow(row, data, dataIndex) {
             $compile(angular.element(row).contents())($scope);
         }
    	 
//    	 function gridColumns(route) {
//             return [
//                 DTColumnBuilder.newColumn("id", "id").withOption('name', 'id'),
//                 DTColumnBuilder.newColumn("name", "name").withOption('name', 'name'),
//                 DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '9%')
//                .renderWith(function (data, type, full, meta) {
//
//                    return '<button class="btn btn-warning" ng-click="typeOcorrencyListCtrl.edit(' + data.id + ')">' +
//                             '   <i class="fa fa-edit"></i>' +
//                             '</button>&nbsp;' +
//                             '<button class="btn btn-danger" ng-click="typeOcorrencyListCtrl.delete(' + data.id + ')">' +
//                             '   <i class="fa fa-trash-o"></i>' +
//                             '</button>';
//
//                })
//             ]
//         }
    	 
    }
})();