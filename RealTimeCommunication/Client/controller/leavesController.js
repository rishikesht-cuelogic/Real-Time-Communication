hrms.controller('leavesController', ['$scope', '$http', 'service', function ($scope, $http, service) {

    function load() {
        service.getLeaves().then(function (data) {
            $scope.leaves = data;
        });
    }

    function reload() {
        load();
    }

    $scope.leaveRequest = {
        startDate: '',
        endDate: '',
        reason: '',
    }

    $scope.leaveRequest = function () {
        var data = { UserId: localStorage.getItem('UserId'), StartDate: $scope.leaveRequest.startDate, EndDate: $scope.leaveRequest.endDate, Reason: $scope.leaveRequest.reason };
        service.leaveRequest(data).then(function (data) {
            if (data) {
                alert("Successfully sent request");
                reload();
            }
        });
    }

    // Create a function that the hub can call to broadcast messages.
    hub.client.leaveAction = function (data) {
        for (var i = 0; i < $scope.leaves.length; i++) {
            if ($scope.leaves[i].LeaveId == data.LeaveId) {
                $scope.leaves[i].Status = data.Status;
                $scope.$apply();
            }
        }
    };
    $.connection.hub.url = 'http://localhost:62643/signalr';
    $.connection.hub.start().done(function () { });
    load();
}]);