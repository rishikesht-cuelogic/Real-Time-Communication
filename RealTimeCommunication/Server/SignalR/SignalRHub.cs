using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Server.SignalR
{
    public class SignalRHub:Hub
    {
        private NodeHub nodeHub = null;
        public SignalRHub()
        {
            nodeHub = NodeHub.Instance;
        }
      
        public void Initialise(int userId)
        {
            nodeHub.AddNode(Context.ConnectionId, userId);
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastPerformance(userId);
        }

        public override Task OnDisconnected(bool disconnect)
        {
            nodeHub.RemoveNode(Context.ConnectionId);
            return base.OnDisconnected(true);
        }
    }
}