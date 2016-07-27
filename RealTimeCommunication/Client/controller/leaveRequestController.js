hrms.controller('leaveRequestController', ['$scope', function ($scope) {
    $scope.leaves = [
                     {Name:'Nikhil Babar', StartDate: '27:06:2016', EndDate: '01:08:2016', Reason: 'Due to personal reason', Status: 'Pending' },
                     { Name: 'Nikhil Babar', StartDate: '27:06:2016', EndDate: '01:08:2016', Reason: 'Due to personal reason', Status: 'Pending' },
                     { Name: 'Nikhil Babar', StartDate: '27:06:2016', EndDate: '01:08:2016', Reason: 'Due to personal reason', Status: 'Pending' },
                     { Name: 'Nikhil Babar', StartDate: '27:06:2016', EndDate: '01:08:2016', Reason: 'Due to personal reason', Status: 'Pending' }
    ]
    //setTimeout(function () {
    //    alert("Timeout over");
    //    hub.server.initialise('Inside done');
    //}, 1000);
}]);