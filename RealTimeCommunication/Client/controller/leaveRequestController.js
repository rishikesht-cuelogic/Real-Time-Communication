hrms.controller('leaveRequestController', ['$scope', 'service', function ($scope,  service) {
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

    hub.client.newLeaveRequest = function (data) {        
        $scope.$apply(function () {
            $scope.leaves.push(data);
        });
    };

    $.connection.hub.url = service.rootUrl+'signalr';
    $.connection.hub.start().done(function () { });

    load();
}]);