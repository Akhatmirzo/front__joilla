// function isTOken
function isToken(page) {
  const roles = ["admin", "employer", "employee"];
  const dashboardPage = ["../admin/adminDashboard.html", "../pages/employerDashboard.html", "../pages/employeeDashboard.html"];
  const role = JSON.parse(localStorage.getItem("token"));

  if (!role || role === undefined || role === null) {
    window.location.href = "../index.html";
  }else if (role) {
    roles.forEach((rol, index) => {
      if (rol !== page && role.role === rol) {
        window.location.href = dashboardPage[index];
      }
    });
  }
}

// Sign out function
function signOut() {
  localStorage.removeItem("token");
  window.location.reload();
}

// Joilla API
// const api = "http://localhost:8767/api/v1/";
const api = "https://joilla-market.onrender.com/api/v1/";
