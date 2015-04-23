'use strict';
angular.module('ltapp')
  .controller('MainCtrl', function ($scope, hotelsSvc) {
    $scope.hotels = [];

    $scope.predicate = '';
    $scope.reverse = false;
    $scope.maxStars = 5;

    $scope.sorting = {
      Distance: -1,
      Stars: -1,
      MinCost: -1,
      UserRating: -1
    };

    $scope.filtering = {
      Name: '',
      Stars: 0,
      MinCost: 0,
      UserRating: 0
    };

    $scope.filterData = function(item) {
      var result = [];
      if($scope.filtering.Name !== '') {
        var searchName = false;
        _.each($scope.filtering.Name.split(' '), function(element) {
          if(item.Name.search(element) !== -1) {
            searchName = true;
          }
        });
        result.push(searchName);
      }

      if($scope.filtering.Stars !== 0) {
        result.push(item.Stars <= $scope.filtering.Stars);
      }

      if($scope.filtering.MinCost !== 0 && $scope.filtering.MinCost !== '') {
        result.push(item.MinCost <= $scope.filtering.MinCost);
      }

      if($scope.filtering.UserRating !== 0 && $scope.filtering.UserRating !== '') {
        if(!item.UserRating) {
          result.push(false);
        }
        else {
          result.push(item.UserRating <= $scope.filtering.UserRating);
        }
      }

      return function(result) {
        if(result.length === 0) {
          return true;
        }

        // Yes, I know eval is evil but works for this test
        var r = eval(result.join('&'));
        return r;
      }(result);
    };


    $scope.orderBy = function(orderBy) {
      $scope.predicate = orderBy;
      $scope.reverse = ($scope.sorting[orderBy] = -1 * $scope.sorting[orderBy]) === 1;
      console.log($scope.sorting, $scope.predicate, $scope.reverse);
    };

    $scope.setStars = function(i) {
      console.log(i);
      $scope.filtering.Stars = i;
    };

    $scope.getNumber = function(num) {
        return new Array(num);
    };

    hotelsSvc.getAll().then(function(response) {
      console.log(response);
      $scope.hotels = response;
    });
  });
