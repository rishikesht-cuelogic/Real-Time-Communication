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
            var context = GlobalHost.ConnectionManager.GetHubContext<SignalRHub>();

            context.Clients.All.broadcastMessage("adafsa","sadfasdf");

            ViewBag.Title = "Home Page";
            return View();
        }
    }
}
