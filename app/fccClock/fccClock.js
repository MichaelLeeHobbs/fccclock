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
        var active = false;

        $scope.break = 5;
        $scope.session = 25;
        $scope.sessionName = 'session';
        $scope.sessionTime = 25;

        $scope.toggleClock = function () {
            active = !active;
        };

        $scope.modTime = function (name, time) {
            // ignore updates if clock is running
            if (active) { return; }
            $scope[name] += time;
            if ($scope[name] < 1) {
                $scope[name] = 1;
            }
            // update sessionTime remaining if that session was updated
            if (name === $scope.sessionName) {
                $scope.sessionTime = $scope[name];
            }
        };


    }]);