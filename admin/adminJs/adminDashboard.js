isToken("admin");

const employerForm = document.getElementById("employerForm");
const employerTable = document.getElementById("employerTable");

// Register Employer
employerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let fullname = event.target[0].value;
  let phone_number = event.target[1].value;
  let password = event.target[2].value;

  const employer = {
    fullname,
    phone_number,
    password,
  };

  const result = await registerEmployer(employer);

  alert(result.message);
});

// Employer Render
async function employerRender() {
  const data = await getAllEmployers();

  let employers = data.employers || [];

  employerTable.innerHTML = "";
  employers.forEach((employer) => {
    const { fullname, phone_number, balance, _id } = employer;

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
                  onclick="employerEdit('${_id}')"
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                  Edit
              </button>
  
              <button
                  type="button"
              onclick="employerOneDelete('${_id}')"
                  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                  Delete
              </button>
              </td>
          </tr>
      `;

    employerTable.innerHTML += template;
  });
}

employerRender();

// Edit Employer
const employerEditModal = document.getElementById("employerEditModal");
const employerClosingModal = document.getElementById("employerClosingModal");

async function employerEdit(id) {
  // Open modal
  openEmployerEditModal();
  const editEmployerForm = document.getElementById("editEmployerForm");

  const oneEmployer = await getOneEmployer(id);

  const { fullname, phone_number, password } = oneEmployer.data;

  editEmployerForm[0].value = fullname;
  editEmployerForm[1].value = phone_number;

  // Editing
  editEmployerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let fullname = event.target[0].value;
    let phone_number = event.target[1].value;

    const editObj = {
      fullname,
      phone_number,
      // password
    };

    const result = await putOneEmployer(id, editObj);
    alert(result.message);
    employerRender();
    // Close modal
    closeEmployerEditModal();
  });
}

// Edit Employee
async function employeeEdit(id) {
  // Open modal
  openEmployerEditModal();
  const editEmployeeForm = document.getElementById("editEmployerForm");

  const oneEmployee = await getOneEmployee(id);

  const { fullname, phone_number, password } = oneEmployee.data;

  editEmployeeForm[0].value = fullname;
  editEmployeeForm[1].value = phone_number;

  // Editing
  editEmployeeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let fullname = event.target[0].value;
    let phone_number = event.target[1].value;

    const editObj = {
      fullname,
      phone_number,
      // password
    };

    const result = await putOneEmployer(id, editObj);
    alert(result.message);
    employerRender();
    // Close modal
    closeEmployerEditModal();
  });
}

// Open modal
function openEmployerEditModal() {
  employerEditModal.classList.remove("hidden");
  employerEditModal.classList.add("flex");
}

// Close modal
function closeEmployerEditModal() {
  employerEditModal.classList.add("hidden");
  employerEditModal.classList.remove("flex");
}

// Employee script
const employerSelect = document.getElementById("employerSelect");
const employeeTable = document.getElementById("employeeTable");

// Select option render employer render
async function getAllEmployerName() {
  const data = await getAllEmployers();
  const employers = await data.employers;
  if (employers) {
    employerSelect.innerHTML = `<option value=".">Select Employer</option>`;
    employers.forEach((employer) => {
      const { fullname, _id } = employer;
      const template = `
              <option value="${_id}">${fullname}</option>
          `;

      employerSelect.innerHTML += template;
    });
  }
}

// load window run function
getAllEmployerName();

// Employee render
function employeeRender(data, response) {
  let dataLength = data.length;
  if (dataLength > 0) {
    employeeTable.innerHTML = "";
    data.forEach((employee) => {
      const { fullname, phone_number, balance, _id } = employee;

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
  
              <button
                  onclick="deleteEmployee('${_id}')"
                  type="button"
                  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                  Delete
              </button>
              </td>
          </tr>            
          `;

      employeeTable.innerHTML += template;
    });
  } else {
    employeeTable.innerHTML = `
      <h1 class="absolute top-[100%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
          ${response.message}
      </h1>;
      `;
  }
}

// Selected admin emoloyer rendering
async function renderEmplAdminSelect() {
  const select = employerSelect.value;
  if (select != ".") {
    const result = await getAllEmployees(select);
    employeeRender(result.employees || [], result);
  }
}

// Delete employee
async function deleteEmployee(id) {
  const result = await deleteOneEmployee(id);
  alert(result.message);
  employeeRender(result.employees || [], result);
}
