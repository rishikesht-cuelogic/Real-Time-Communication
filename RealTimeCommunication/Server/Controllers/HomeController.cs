using Microsoft.AspNet.SignalR;
using Server.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Server.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            for(int i = 0; i < 5; i++)
            {
                var context = GlobalHost.ConnectionManager.GetHubContext<SignalRHub>();
                context.Clients.All.Send("Admin", "stop the chat");
                int milliseconds = 5000;
                Thread.Sleep(milliseconds);
            }

            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
