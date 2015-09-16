'use strict';

angular.module('myApp.fccClock', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/fccClock', {
            templateUrl: 'fccClock/fccClock.html',
            controller: 'FccClockCtrl'
        });
    }])

    .controller('FccClockCtrl', ['$scope', function ($scope) {
        var tMins = 25;
        var tSec = 0;
        var active = false;
        var maxFill = 142;
        var intervalID;

        $scope.break = 5;
        $scope.session = 25;
        $scope.sessionName = 'session';
        $scope.sessionTime = '25:00';
        $scope.fillHeight = 0;

        $scope.toggleClock = function () {

            if (!active) {
                // this is our timer, will call update once per second
                intervalID = setInterval(update, 1000);
                active = true;

            } else {
                // this is our timer, will call update once per second
                clearInterval(intervalID);
                intervalID = undefined;
                active = false;

            }

        };

        $scope.modTime = function (name, time) {
            // ignore updates if clock is running
            if (intervalID !== undefined) {
                return;
            }
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

        // autoUpdate should be true if update is from an automated process
        var updateTimeDisplay = function (autoUpdate) {
            if (tSec < 10) {
                $scope.sessionTime = tMins + ':' + '0' + tSec;
            } else {
                $scope.sessionTime = tMins + ':' + tSec;
            }
            // this avoids the digest already in progress error
            if (autoUpdate) {
                $scope.$apply();
            }

        };

        var updateTime = function () {
            if (tSec > 0) {
                tSec--;
            } else {
                tMins--;
                tSec = 59;
            }
        };
        var updateFill = function () {
            // why was this so hard? need more caffeine!!!
            var total = $scope[$scope.sessionName] * 60;
            var elapsed = $scope[$scope.sessionName] - tMins + (60 - tSec);
            var percentDone = elapsed / total;
            var percentFill = maxFill * percentDone;
            $scope.fillHeight = percentFill + 'px';
        };

        var update = function () {
            updateTime();
            if (tMins < 0) {
                if ($scope.sessionName === 'session') {
                    $scope.sessionName = 'break';
                } else {
                    $scope.sessionName = 'session';
                }

                tMins = $scope[$scope.sessionName];
                tSec = 0;

                // Play audio
                var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
                var audio = new Audio(wav);
                audio.play();
            }
            updateFill();
            updateTimeDisplay(true);
        };


    }]);