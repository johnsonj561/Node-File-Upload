myApp.controller('mainCtrl', ['$rootScope', '$location', 'FileService', '$scope', function ($rootScope, $location, FileService, $scope) {

  var app = this;

  // using loadme to hide HTML until loadme is true
  // this will prevent the angular {{ }} displaying during page loading
  app.loadme = false
  app.loadme = true;

  $scope.createDirectory = function () {
    var directoryData = {
      newDirectory: $scope.uploadData.genericName
    }
    FileService.createDirectory(directoryData).then(function (data) {
      if (data) {
        console.log(data);
      } else {
        console.log('error creating new directory');
      }
    });
  };

  $scope.getAvailableDirectories = function () {
    FileService.getAvailableDirectories('uploads').then(function (data) {
      if (data) {
        console.log(data);
      } else {
        console.log('error getting list of directories :(');
      }
    });
  };

  $scope.pillClasses = ['Sedative', 'Opiate', 'Amphetamine', 'Psychedellic', 'Synthetic', 'Barbiturate', 'Pain Reliever', 'Antibiotic', 'OTC'];
  $scope.pillClass = $scope.pillClasses[0];

  $scope.uploadData = {};
  $scope.Submit = function () {
    FileService.postFile($scope.uploadData).then(function (data) {
      if (data) {
        console.log(data);
      } else {
        console.log('error uploading file');
      }
    });
  }

  /*
   * Invoked when route changes
   */
  $rootScope.$on('$routeChangeStart', function () {
    console.log('route change', $location);
  });

}]);
