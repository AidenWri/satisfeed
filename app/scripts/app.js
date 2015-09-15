'use strict';

/**
 * @ngdoc overview
 * @name satisfeedApp
 * @description
 * # satisfeedApp
 *
 * Main module of the application.
 */
angular
  .module('satisfeedApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'checklist-model',
    'firebase'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/reason', {
        templateUrl: 'views/reason.html',
        controller: 'ReasonCtrl',
        controllerAs: 'reason'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
