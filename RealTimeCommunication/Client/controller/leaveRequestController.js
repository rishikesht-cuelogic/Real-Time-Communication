hrms.controller('leaveRequestController', ['$scope', '$http', function ($scope, $http) {
    $scope.leaves = [];

    function load() {
        $http({
            method: 'GET',
            url: 'http://localhost:62643/api/leave/getall',
        }).then(function successCallback(response) {
            $scope.leaves = response.data;
        }, function errorCallback(response) {
        });
    }

    load();

    function reload() {
        load();
    }

    $scope.approve = function (userid) {
        $http({
            method: 'POST',
            url: 'http://localhost:62643/api/leave/action',
            data: {UserId:userid,Status:'Approved'}
        }).then(function successCallback(response) {
            if (response.data)
            {
                alert("Approved");
                reload();
            }
                

        }, function errorCallback(response) {
        });
    }

    $scope.reject = function (userid) {
        $http({
            method: 'POST',
            url: 'http://localhost:62643/api/leave/action',
            data: { UserId: userid, Status: 'Rejected' }
        }).then(function successCallback(response) {
            if (response.data) {
                reload();
                alert("Rejected");
            }
                
        }, function errorCallback(response) {
        });
    }

    hub.client.newLeaveRequest = function (data) {        
        $scope.$apply(function () {
            $scope.leaves.push(data);
        });
    };
    $.connection.hub.url = 'http://localhost:62643/signalr';
    $.connection.hub.start().done(function () { });

}]);