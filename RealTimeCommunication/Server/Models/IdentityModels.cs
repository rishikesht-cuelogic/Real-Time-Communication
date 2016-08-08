using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Server.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public int? ManagerId { get; set; }

        public virtual IEnumerable<Leave> Leaves { get; set; }
    }

    public class Leave
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ActionTakenBy { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }
        public virtual User User { get; set; }
        public DateTime CreatedDate { get; set; }
    }


    public class HRMSContext : DbContext
    {
        public HRMSContext() : base("HRMS")
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Leave> Leaves { get; set; }
    }
}