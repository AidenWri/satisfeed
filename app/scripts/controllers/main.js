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
      'https://customersatisfaction.firebaseIO.com/stores');


    $scope.responses = $firebaseArray(customerResponse);

    $scope.form = {
      experience: '',
      extraInfo: '',
      storeID: localStorage.getItem('storeID')
    };

    $scope.tempStoreID = null;

    $scope.whyOptions = [
      'Queue length or time',
      'Quality of service',
      'Speed of service',
      'Condition of parcel'
    ];
    $scope.intro = true;
    $scope.question = false;
    $scope.why = false;
    $scope.reason = false;
    $scope.thankYou = false;
    $scope.badResponse = false;
    $scope.goodResponse = false;

    $scope.startSurvey = function() {
      $scope.intro = false;
      $scope.question = true;
    };

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
      var refreshTimer = setTimeout(function() {
        resetting();
      }, 5000);
    };

    function resetting() {
      var timeOfResponse = new Date();
      var timeOfResponse2 = timeOfResponse.toString();
      customerResponse.child($scope.form.storeID).push({
        experience: $scope.form.experience,
        extraInfo: $scope.form.extraInfo || null,
        why: $scope.form.why || null,
        time: timeOfResponse2
      });
      $scope.thankYou = false;
      $scope.intro = true;
      $scope.form.experience = {};
      $scope.form.extraInfo = null;
      $scope.form.why = {};
    }

  });
