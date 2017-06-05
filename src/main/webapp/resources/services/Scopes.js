angular.module('Koulu').factory('Scopes', scopesService);

scopesService.$inject = ['$rootScope'];

function scopesService($rootScope) {
    var scopesService = {
        store: store,
        get: get
  
    };

    var mem = {};

    function store(key,value) {
        return mem[key] = value;
    }

    function get(key) {
        return mem[key];
    }


    return scopesService;
}
