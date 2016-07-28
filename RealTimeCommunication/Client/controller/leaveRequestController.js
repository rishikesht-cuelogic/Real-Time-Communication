hrms.controller('leaveRequestController', ['$scope', '$http', function ($scope, $http) {
    $scope.leaves = [];

    function Initialize() {
        $http({
            method: 'GET',
            url: 'http://localhost:62643/api/leave/getall',
        }).then(function successCallback(response) {
            $scope.leaves = response.data;
        }, function errorCallback(response) {
        });
    }

    Initialize();

    $scope.approve = function (userid) {
        $http({
            method: 'POST',
            url: 'http://localhost:62643/api/leave/action',
            data: {UserId:userid,Status:'Approved'}
        }).then(function successCallback(response) {
            if (response.data)
                alert("Approved");
        }, function errorCallback(response) {
        });
    }

    $scope.reject = function (userid) {
        $http({
            method: 'POST',
            url: 'http://localhost:62643/api/leave/action',
            data: { UserId: userid, Status: 'Rejected' }
        }).then(function successCallback(response) {
            if (response.data)
                alert("Rejected");
        }, function errorCallback(response) {
        });
    }


    hub.client.broadcastMessage = function (data) {
        alert('Leave request page:' + data);
        console.log(data);
    };
}]);