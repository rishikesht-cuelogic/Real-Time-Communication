using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    public class AccountController : ApiController
    {
        HRMSContext db = null;
        public AccountController()
        {
            db = new HRMSContext();
        }
        [HttpPost]
        public object Login(LoginModel model)
        {
            var user = db.Users.Where(t => t.Username == model.Username && t.Password == model.Password).FirstOrDefault();
            if (user!=null)
            {
                return new { IsValid=true,Role=user.Role,UserId=user.Id};
            }
            return new { IsValid = false};
        }
    }
}
