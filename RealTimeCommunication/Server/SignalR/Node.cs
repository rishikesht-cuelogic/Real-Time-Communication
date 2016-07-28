using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.SignalR
{
    public class Node
    {
        public string ConnectionId { get; set; }
        public int UserId { get; set; }
        public string Role { get; set; }
    }
}