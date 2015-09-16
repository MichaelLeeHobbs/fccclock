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
        var tMins = 25;
        var tSec = 0;
        var active = false;
        var maxFill = 142;

        $scope.break = 5;
        $scope.session = 25;
        $scope.sessionName = 'session';
        $scope.sessionTime = '25:00';
        $scope.fillHeight = 0;

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
                tMins = $scope[name];
                tSec = 0;
                updateTimeDisplay();
            }
        };

        var updateTimeDisplay = function (){
            if (tSec === 0) {
                $scope.sessionTime = tMins + ':' + '00';
            } else {
                $scope.sessionTime = tMins + ':' + tSec;
            }

        };

        var updateTime = function () {
            if (tSec > 1) {
                tSec--;
            } else {
                tMins--;
                tSec = 60;
            }
        };
        var update = function () {
            if (tMins < 0) {
                if ($scope.sessionName === 'session') {
                    $scope.sessionName = 'break';
                }  else {
                    $scope.sessionName = 'session';
                }

                tMins = $scope[$scope.sessionName];
                tSec = 0;
            }


        }


    }]);