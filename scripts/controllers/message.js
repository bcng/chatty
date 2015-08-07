'use strict';

angular.module('chattyApp')

.controller('MessageCtrl', function($scope, MessageService) {

    $scope.getMessages = function() {
        MessageService.getMessages().then(function(response) {
            $scope.messages = response.data;
        });
    }

    $scope.getMessages();

    $scope.addMessage = function() {
        MessageService.addMessage($scope.msg).then(function(response) {
            console.log(response);
            $scope.messages = response.data;
        });
    };


});
