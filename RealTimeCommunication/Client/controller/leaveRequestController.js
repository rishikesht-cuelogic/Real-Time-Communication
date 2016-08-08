hrms.controller('leaveRequestController', ['$scope', 'service', 'backendHubProxy', function ($scope, service, backendHubProxy) {
    var hub = backendHubProxy();
    $scope.leaves = [];

    function load() {
        service.getAllLeaves().then(function (data) {
            $scope.leaves = data;
        });
    }

    function reload() {
        load();
    }

    $scope.approve = function (leaveId) {
        service.leaveAction(leaveId, 'Approved').then(function (data) {
            if (data) {
                alert("Approved");
                reload();
            }
        });
    }

    $scope.reject = function (leaveId) {
        service.leaveAction(leaveId, "Rejected").then(function (data) {
            if (data) {
                alert("Rejected");
                reload();
            }
        });
    }

    hub.on('newLeaveRequest', function (data) {        
        $scope.leaves.splice(0, 0, data);
    });

    load();
}]);