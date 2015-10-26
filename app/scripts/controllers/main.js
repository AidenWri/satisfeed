'use strict';

/**
 * @ngdoc function
 * @name satisfeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the satisfeedApp
 */
angular.module('satisfeedApp')
  .controller('MainCtrl', function($scope, $firebaseArray) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var customerResponse = new Firebase(
      'https://customersatisfaction.firebaseIO.com');


    $scope.responses = $firebaseArray(customerResponse);


    $scope.form = {
      experience: '',
      extraInfo: '',
      storeID: localStorage.getItem('storeID') || null
    };

    $scope.tempStoreID = null;

    $scope.whyOptions = [
      'Queue length/time',
      'Quality of service',
      'Speed of service',
      'Condition of parcel'
    ];

    $scope.question = true;
    $scope.why = false;
    $scope.reason = false;
    $scope.thankYou = false;
    $scope.badResponse = false;
    $scope.goodResponse = false;

    $scope.saveStoreID = function() {
        $scope.form.storeID = $scope.tempStoreID;

        if (window.localStorage !== undefined) {
            window.localStorage.setItem('storeID', $scope.form.storeID);
        }
    };

    $scope.selectResponse = function(response) {
      $scope.question = false;
      $scope.why = true;
      $scope.form.experience = response;
      if ($scope.form.experience === 'bad') {
        $scope.badResponse = true;
      } else if ($scope.form.experience === 'good') {
        $scope.goodResponse = true;
      }
    };

    $scope.responseReason = function() {
      $scope.badResponse = false;
      $scope.goodResponse = false;
      $scope.why = false;
      $scope.more = true;
    };


    $scope.moreInfo = function() {
      $scope.more = false;
      $scope.thankYou = true;
      var boom = setTimeout(function() {
        resetting();
      }, 5000);
    };

    function resetting() {
      $scope.responses.$add({
        customerRsponse: $scope.form
      });
      $scope.thankYou = false;
      $scope.question = true;
      $scope.form = {};
      $scope.form.why = {};
    }

  });
