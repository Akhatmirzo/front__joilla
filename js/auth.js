const role = JSON.parse(localStorage.getItem("token"));

if (role && role !== undefined) {
  if (role.role == "admin") {
    window.location.href = "../admin/adminDashboard.html";
  } else if (role.role == "employer") {
    window.location.href = "../pages/employerDashboard.html";
  } else if (role.role == "employee") {
    window.location.href = "../pages/employeeDashboard.html";
  }
}

const loginForm = document.querySelector("#loginForm");

// Login form
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const select = e.target[1].value;
  const phone_number = e.target[2].value;
  const password = e.target[3].value;

  const user = {
    phone_number,
    password,
  };

  if (user && select) {
    try {
      const response = await fetch(
        `${api}${select}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if(!response.ok) {
        throw new Error(response.statusText);
      }

      const res = await response.json();

      if (response.status === 200) {
        alert(res.message);
        const role = {
          role: select,
          token: res.token,
        };

        localStorage.setItem("token", JSON.stringify(role));
        window.location.reload();
      }else {
        alert(res.message || res.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
});