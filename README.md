#Synopsis

The objective is How to integrate ASP.NET SignalR with RESTful web services and AngularJS in such a scenario where RESTful web services
 hosted on one server and Client application (AngularJS) is hosted on different server. 

##Introduction
ASP.NET SignalR is a new library for ASP.NET developers that makes developing real-time web functionality easy. SignalR allows bi-directional communication between server and client. Servers can now push content to connected clients instantly as it becomes available. SignalR supports Web Sockets, and falls back to other compatible techniques for older browsers. SignalR includes APIs for connection management (for instance, connect and disconnect events), grouping connections, and authorization.

##Application
This is HRMS application. Here, employeer can request for leave with reason. This request notify to manager immediately if Manager is online. Manager can either approve or reject the leave request. As soon as manager takes any action on leave request, corresponding leave status change at employeer side immediately.

##Project Structure
In this solution, there are 2 applications.
1. Client: This is a client side application which has implemented using AngularJS. It has below folders:
 a. controller: This folder has AngularJS controllers.
 b. factory: This folder has services which interacts with RESTful web services.
 c. html: This folder has all html files.
 d. js: This folder has javascript libraries 1.bootstrap 2.AngularJS
 e. app.js: This file has routing loging.
 f. index.html: This is a startup file which has included all javscripts libraries.
2. Server: This is server side application which has RESTful web services.
 a. App_Start: This folder has WebApiConfig.cs file which has api routes.
 b. Controllers: This folder has all RESTful MVC Controllers.
 c. Models: This folder has all required Models.
 d.SignalR: This folder has code to manage connections.
 e. Startup.cs: This is startup file which has Configuration method where SignalR is initialised.
 f. Web.config: This file has configurations like DB connection string.

##Installation
** Software Requirement**

1. Visual Studio 2013 and above

  a. .NET Framework 4.5.2

2. SQL Server 2008 and above 

** Prerequisite**
1. Knowledge of Web API 2
2. Knowledge of AngularJS

** Configuration **

Specify Database connection string in web.config file. This application has used code first approach. So when you run Server application it creates DB as per connection string specified in web.config file. First run Server application then run Client application.


##References
http://www.asp.net/signalr/overview/getting-started/introduction-to-signalr
http://www.asp.net/signalr/overview/getting-started/tutorial-getting-started-with-signalr


