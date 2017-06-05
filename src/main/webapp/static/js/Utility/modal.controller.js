 angular.module('app').controller('customers.modal', ['$scope', '$uibModalInstance',
             function ($scope, $uibModalInstance) {

    $scope.ok = function () {
        $uibModalInstance.close($scope);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
       

}]);