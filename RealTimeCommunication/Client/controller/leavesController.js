hrms.controller('leavesController', ['$scope', 'service', 'backendHubProxy', function ($scope, service, backendHubProxy) {
    var performanceDataHub = backendHubProxy(backendHubProxy.defaultServer, 'signalRHub');
    
    console.log(backendHubProxy.defaultServer);
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
                //$scope.leaveRequest = {};
                reload();
            }
        });
    }

    performanceDataHub.on('leaveAction', function (data) {

        for (var i = 0; i < $scope.leaves.length; i++) {
            if ($scope.leaves[i].LeaveId == data.LeaveId) {
                $scope.leaves[i].Status = data.Status;

            }
        }

    });

    load();
}]);