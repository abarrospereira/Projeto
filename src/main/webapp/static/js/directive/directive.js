 angular.module('app').directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('sidebar-collapse'); 
                    return;
                  }
                  element.removeClass('sidebar-collapse');
            });
        }
    };
});  
 
 angular.module('app').directive('autoFocus', function($timeout) {
	    return {
	        restrict: 'AC',
	        link: function(_scope, _element) {
	            $timeout(function(){
	                _element[0].focus();
	            }, 0);
	        }
	    };
	});