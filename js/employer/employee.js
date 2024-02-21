const employerForm = document.querySelector("#employeeForm");
const employeeTable = document.getElementById("employeeTable");

const token = JSON.parse(localStorage.getItem("token"));

employerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = e.target[0].value;
  const phone_number = e.target[1].value;
  const password = e.target[2].value;

  const employee = {
    fullname,
    phone_number,
    password,
  }

  try {
    const response = await fetch(`${api}employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
      },
      body: JSON.stringify(employee),
    });

    console.log(response);
    const res = await response.json();

    if (response.status === 201) {
      console.log(res);
      alert(res.message);
      renderEmployees();
    } else {
      alert(res.error);
      throw new Error(res.error || res.message);
    }
  } catch (error) {
    console.log(error);
  }
});


// Get all Employees

async function getAllEmployees() {
  const response = await fetch(`${api}employee/`, {
    headers: {
      "Content-Type": "application/json",
      authorization: token.token,
    },
  });

  const res = await response.json();

  if (!response.ok) {
    alert(res.message);
    throw new Error(res.message);
  }

  if (response.status === 200) {
    return res;
  }
}

async function renderEmployees() {
  try {
    const data = await getAllEmployees();
    const employees = data.employees || [];

    employeeTable.innerHTML = "";
    employees.forEach((employee) => {
      const { fullname, phone_number, balance } = employee;
      const template = `
        <tr>
          <th
            class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left text-blueGray-700"
          >
            ${fullname}
          </th>
          <td
            class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4"
          >
            ${phone_number}
          </td>
          <td
            class="border-t-0 align-center border-l-0 border-r-0 text-xs whitespace-nowrap py-4"
          >
            <span>${balance}</span>$
          </td>
          <td
            class="w-[100px] border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4"
          >
            <button
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Edit
            </button>

            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
          </td>
        </tr>              
      `;

      employeeTable.innerHTML += template;
    });
  } catch (error) {
    console.log(error);
  }
}

renderEmployees();
