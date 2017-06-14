myApp.factory('FileService', ['$http', function ($http) {

  var fileFactory = {};

  /*
   * Create new directory in /uploads/
   */
  fileFactory.createDirectory = function (dirName) {
    return $http.post('/api/createDir', dirName);
  };

  /*
   * Get list of available directories found at path
   */
  fileFactory.getAvailableDirectories = function (rootDir) {
    return $http.get('/api/dirList/' + rootDir);
  }

  /*
   * Upload file to server
   */
  fileFactory.postFile = function (data) {
    var fd = new FormData();
    console.log('user services data: ', data);
    for (var key in data) {
      fd.append(key, data[key]);
    }
    return $http.post('/api/upload', fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    });
  };

  return fileFactory;
}]);
