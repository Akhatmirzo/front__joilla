const role = JSON.parse(localStorage.getItem("token"));

if (role && role !== undefined) {
  if (role.role === "admin") {
    window.location.href = "../admin/adminDashboard.html";
  }
  else if (role.role === "employer") {
    window.location.href = "../pages/employerDashboard.html";
  }
  else if (role.role === "employee") {
    window.location.href = "../pages/employeeDashboard.html";
  }
  else {
    window.location.href = "../index.html";
  }
}