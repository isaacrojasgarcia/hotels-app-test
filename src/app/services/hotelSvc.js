angular.module('ltapp')
.factory('hotelsSvc', HotelsSvc);

function HotelsSvc($http, $q, _) {
  var data = [];

  function loadData(page) {
    var deferred = $q.defer();
    $http.get('/data/hotels.json')
      .success(function(response) {
        data = _.slice(response.Establishments, 1, 20);
        // data = response.Establishments;
        deferred.resolve(data);
      })
      .error(function(error) {
        console.log('ERROR loading data');
        deferred.reject(error);
      });
    return deferred.promise;
  }

  return {
      getAll: getAll
  };

  function getAll() {
    var deferred = $q.defer();
    if(data.length === 0) {
      loadData().then(deferred.resolve);
    }
    else {
      deferred.resolve(data);
    }
    return deferred.promise;
  }
}
