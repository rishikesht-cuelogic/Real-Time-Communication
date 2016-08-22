using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.SignalR
{
    public class NodeHub
    {
        private static NodeHub nodeHub = null;
        private List<Node> nodes;
        private NodeHub() {
            nodes = new List<Node>();
        }

        public static NodeHub Instance
        {
            get
            {
                if (nodeHub == null)
                    nodeHub = new NodeHub();
                return nodeHub;
            }
        }
        private bool IsConnectionExist(string connectionId)
        {
            if (nodes.Where(t => t.ConnectionId == connectionId).Any())
                return false;
            return true;
        }

        public void AddNode(string connectionId, int userId)
        {
            if (!IsConnectionExist(connectionId))
                nodes.Add(new Node { ConnectionId = connectionId, UserId = userId, Role = "Admin" });
        }

        public void RemoveNode(string connectionId)
        {
            var item = nodes.FirstOrDefault(x => x.ConnectionId == connectionId);
            if (item != null)
            {
                nodes.Remove(item);
            }
        }
        public string GetConnectionId(int userId)
        {
            return nodes.Where(t => t.UserId == userId).Select(t=>t.ConnectionId).FirstOrDefault();
        }

        public void SendNotification(int userId,object data)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<SignalRHub>();
            context.Clients.Client(GetConnectionId(userId)).sendNotification(data);
        }
    }
}