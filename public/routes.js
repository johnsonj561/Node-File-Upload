angular.module('appRoutes', ['ngRoute'])

  .config(function ($routeProvider, $locationProvider) {

    $routeProvider // Create routes

      // Home Route    
      .when('/', {
        templateUrl: '/views/home',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })

      // "catch all" and redirect to home page       
      .otherwise({
        redirectTo: '/'
      });

    // Required for no base (remove '#' from address bar)
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
