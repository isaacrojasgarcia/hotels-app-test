'use strict';
angular.module('ltapp')
  .controller('MainCtrl', function ($scope, hotelsSvc) {
    $scope.hotels = [];

    $scope.getNumber = function(num) {
        return new Array(num);
    };

    hotelsSvc.getAll().then(function(response) {
      console.log(response);
      $scope.hotels = response;
    });
  });
