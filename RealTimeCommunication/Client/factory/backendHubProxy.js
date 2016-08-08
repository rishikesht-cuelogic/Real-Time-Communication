'use strict';

hrms.factory('backendHubProxy', ['$rootScope', 'backendServerUrl','backendHubName',
function ($rootScope, backendServerUrl,backendHubName) {

      function backendFactory() {
          var connection = $.hubConnection(backendServerUrl);
          var proxy = connection.createHubProxy(backendHubName);
        
          proxy.on('', function (result) {});//Dummy link

          connection.start().done(function () { });

          return {
              on: function (eventName, callback) {
                  proxy.on(eventName, function (result) {
                      $rootScope.$apply(function () {
                          if (callback) {
                              callback(result);
                          }
                      });
                  });
              },
              invoke: function (methodName,data, callback) {
                  proxy.invoke(methodName,data)
                  .done(function (result) {
                      $rootScope.$apply(function () {
                          if (callback) {
                              callback(result);
                          }
                      });
                  });
              }
          };
      };

      return backendFactory;
  }]);