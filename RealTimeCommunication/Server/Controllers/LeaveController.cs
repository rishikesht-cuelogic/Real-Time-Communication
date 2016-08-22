using Microsoft.AspNet.SignalR;
using Server.Models;
using Server.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    public class LeaveController : ApiController
    {
        private HRMSContext db = null;
        private NodeHub hub = null;
        public LeaveController()
        {
            db = new HRMSContext();
            hub = NodeHub.Instance;
        }

        [HttpPost]
        public bool LeaveRequest(LeaveModel model)
        {
            var leave = new Leave
            {
                UserId = model.UserId,
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                Reason = model.Reason,
                Status = "Pending",
                CreatedDate=DateTime.Now
            };
            db.Leaves.Add(leave);
            db.SaveChanges();

            var user = db.Users.Where(t => t.Id == model.UserId).FirstOrDefault();

            var context = GlobalHost.ConnectionManager.GetHubContext<SignalRHub>();
            context.Clients.All.newLeaveRequest(new { Name=user.Name,StartDate=leave.StartDate,EndDate=leave.EndDate,Reason=leave.Reason,Status="Pending",LeaveId=leave.Id});
            return true;
        }

        public IEnumerable<LeaveModel> Get(int userid)
        {
            
            return db.Leaves.Where(t => t.UserId==userid).OrderByDescending(t=>t.CreatedDate).Select(t=>new LeaveModel { Name = t.User.Name, StartDate = t.StartDate, EndDate = t.EndDate, Reason = t.Reason, Status = t.Status,LeaveId=t.Id });
        }

        public IEnumerable<LeaveModel> GetAll()
        {
            return GetAllLeaves();
        }

        private IEnumerable<LeaveModel> GetAllLeaves()
        {
            return db.Leaves.Select(t => new LeaveModel { Name = t.User.Name, StartDate = t.StartDate, EndDate = t.EndDate, Reason = t.Reason, Status = t.Status,UserId=t.UserId,LeaveId=t.Id });
        }

        [HttpPost]
        public bool Action(LeaveAction action)
        {
            var leave = db.Leaves.Where(t => t.Id == action.LeaveId).FirstOrDefault();
            if (leave == null)
                return false;
            leave.Status = action.Status;
            db.SaveChanges();
            var context = GlobalHost.ConnectionManager.GetHubContext<SignalRHub>();
            context.Clients.All.leaveAction(new { Status = action.Status, LeaveId = leave.Id });
            //context.Clients.All(hub.GetConnectionId(leave.UserId)).leaveAction(new { Status = action.Status,LeaveId=leave.Id });
            return true;
        }
    }
}
