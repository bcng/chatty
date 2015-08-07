'use strict';

angular.module('chattyApp')

.service('MessageService', function($http, $q) {
  	  	this.getMessages = function() {
            var deferred = $q.defer();
            //can also do http://localhost:8887
            $http.get('//localhost:8887').then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        this.addMessage = function(msg) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://localhost:8887',
                data: {
                    message: msg
                }
            }).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

});
