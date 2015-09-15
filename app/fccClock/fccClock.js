'use strict';

angular.module('myApp.fccClock', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/fccClock', {
            templateUrl: 'fccClock/fccClock.html',
            controller: 'FccClockCtrl'
        });
    }])

    .controller('FccClockCtrl', ['$scope', function ($scope) {
        var remainingTime = 25;

        $scope.breakLength = 5;
        $scope.sessionLength = 25;
        $scope.sessionName = 'Session';
        $scope.sessionTime = remainingTime;
        $scope.toggleClock = function () {
            console.log('test');
        }

    }]);