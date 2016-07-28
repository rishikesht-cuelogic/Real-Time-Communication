hrms.controller('leavesController', ['$scope','$http', function ($scope,$http) {

    $scope.leaves = [
                        { StartDate: '27:06:2016', EndDate: '01:08:2016', Reason: 'Due to personal reason', Status: 'Pending' },
                        { StartDate: '27:06:2016', EndDate: '01:08:2016', Reason: 'Due to personal reason', Status: 'Pending' },
                        { StartDate: '27:06:2016', EndDate: '01:08:2016', Reason: 'Due to personal reason', Status: 'Pending' },
                        { StartDate: '27:06:2016', EndDate: '01:08:2016', Reason: 'Due to personal reason', Status: 'Pending' }
    ]

    function load() {
        $http({
            method: 'GET',
            url: 'http://localhost:62643/api/leave/get?userid='+localStorage.getItem('UserId'),
        }).then(function successCallback(response) {
            $scope.leaves = response.data;
        }, function errorCallback(response) {
        });
    }

    load();

    function reload() {
        load();
    }

    $scope.leaveRequest = {
        startDate: '',
        endDate: '',
        reason: '',
    }

    $scope.leaveRequest = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:62643/api/leave/LeaveRequest',
            data: { UserId: localStorage.getItem('UserId'), StartDate: $scope.leaveRequest.startDate, EndDate: $scope.leaveRequest.endDate, Reason: $scope.leaveRequest.reason }
        }).then(function successCallback(response) {
            if (response.data) {
                alert("Successfully sent request");
                reload();
            }
                
        }, function errorCallback(response) {
        });
    }

    
    // Create a function that the hub can call to broadcast messages.
    hub.client.leaveAction = function (data) {
        alert(data);
    };
    $.connection.hub.url = 'http://localhost:62643/signalr';
    $.connection.hub.start().done(function () { });

}]);