using Microsoft.AspNet.SignalR;
using Server.Models;
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
        private HRMSContext db = null;
        public HomeController()
        {
            db = new HRMSContext();
        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }
    }
}
