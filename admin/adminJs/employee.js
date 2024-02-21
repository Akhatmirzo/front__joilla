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
  
              <button
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
    try {
      const response = await fetch(
        `${api}employee/`,
        {
          headers: {
            "Content-Type": "application/json",
            employer_id: select,
            authorization: token.token,
          },
        }
      );

      const res = await response.json();

      employeeRender(res.employees || [], res);
    } catch (error) {
      console.log(error);
    }
  }
}
