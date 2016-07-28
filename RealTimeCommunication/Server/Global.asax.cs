using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Server
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        HRMSContext db = new HRMSContext();
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            
            db.Database.CreateIfNotExists();
            Seed();

        }
        private void Seed()
        {
            var user0 = new User { Name = "Gajanan Londhe",ManagerId=null, Username = "gajanan", Password = "password", Role = "Manager" };
            var user1 = new User { Name = "Nikhil Babar", ManagerId = 1, Username="nikhil",Password="password", Role = "Sr. Soft Developer" };
            var user2 = new User { Name = "Amey Mandhare", ManagerId = 1, Username="amey", Password = "password", Role = "Sr. Soft Developer" };
            var user3 = new User { Name = "Nilesh Patil", ManagerId = 1, Username="nilesh", Password = "password", Role = "Sr. Soft Developer" };
            db.Users.Add(user0);
            db.Users.Add(user1);
            db.Users.Add(user2);
            db.Users.Add(user3);
            db.SaveChanges();
        }
        protected void Application_BeginRequest()
        {
            if (Request.Headers.AllKeys.Contains("Origin") && Request.HttpMethod == "OPTIONS")
            {
                Response.Flush();
                Response.End();
            }
        }
    }
}
