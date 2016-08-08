hrms.controller('leavesController', ['$scope', 'service', 'backendHubProxy', function ($scope, service, backendHubProxy) {
    var hub = backendHubProxy();
    
    console.log(backendHubProxy.defaultServer);
    function load() {
        $scope.leaveRequest = {
            startDate: '',
            endDate: '',
            reason: '',
        }
        service.getLeaves().then(function (data) {
            $scope.leaves = data;
        });
    }

    function reload() {
        load();
    }
    $scope.apply = function () {
        var data = { UserId: localStorage.getItem('UserId'), StartDate: $scope.leaveRequest.startDate, EndDate: $scope.leaveRequest.endDate, Reason: $scope.leaveRequest.reason };
        service.leaveRequest(data).then(function (data) {
            if (data) {
                alert("Successfully sent request");
                
                reload();
            }
        });
    }

    hub.on('leaveAction', function (data) {

        for (var i = 0; i < $scope.leaves.length; i++) {
            if ($scope.leaves[i].LeaveId == data.LeaveId) {
                $scope.leaves[i].Status = data.Status;

            }
        }

    });

    load();
}]);