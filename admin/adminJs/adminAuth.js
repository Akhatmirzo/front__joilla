const role = JSON.parse(localStorage.getItem("token"));

if (role && role !== undefined) {
  if (role.role == "admin") {
    window.location.href = "../../admin/adminDashboard.html";
  } else if (role.role == "employer") {
    window.location.href = "../../pages/employerDashboard.html";
  } else if (role.role == "employee") {
    window.location.href = "../../pages/employeeDashboard.html";
  }
}

// ADmin auth selector
const adminForm = document.getElementById('adminForm');

adminForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let email = event.target[1].value;
    let password = event.target[2].value;
    
    try {
        const response = await fetch(`${api}admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const res = await response.json();

        if(!response.ok) {
            alert(res.message || res.error);
            throw new Error("Error: " + response.statusText);
        }

        if (response.status === 200) {
            if(res.token) {
                alert(res.message)
                const role = {
                    role: 'admin',
                    token: res.token
                }
    
                localStorage.setItem('token', JSON.stringify(role));
                window.location.href = "../../admin/adminDashboard.html";
            }
        }
    } catch (error) {
        console.log(error);
    }
});
