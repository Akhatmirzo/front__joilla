const employerForm = document.getElementById("employerForm");
const employerTable = document.getElementById("employerTable");

const token = JSON.parse(localStorage.getItem("token"));

// Register Employer
employerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let fullname = event.target[0].value;
  let phone_number = event.target[1].value;
  let password = event.target[2].value;

  try {
    const response = await fetch(`${api}employer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
        mode: "no-cors",
      },
      body: JSON.stringify({
        fullname,
        phone_number,
        password,
      }),
    });

    const res = await response.json();

    if (!response.ok) {
      alert(res.message || res.error);
      throw new Error("Error: " + response.statusText);
    }

    if (response.status == 201) {
      alert(res.message);

      employerRender();
    }
  } catch (error) {
    console.log(error);
  }
});

// Get all Employers
async function getAllEmployers() {
  try {
    const response = await fetch(`${api}employer/`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
        mode: "no-cors",
      },
    });

    const res = await response.json();

    if (!response.ok) {
      alert(res.message || res.error);
      throw new Error("Error: " + response.statusText);
    }

    if (response.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

// Employer one deleted
async function employerOneDelete(id) {
  try {
    const response = await fetch(`${api}employer/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token.token,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      alert(res.message || res.error);
      throw new Error("Error: " + response.statusText);
    }

    if (response.status == 200) {
      alert(res.message);
      employerRender();
    } else {
      alert(res.message);
    }
  } catch (error) {
    console.log(error);
  }
}

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

// Get One Employer
async function getOneEmployer(id) {
  try {
    const response = await fetch(`${api}employer/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
        mode: "no-cors",
      },
    });
    const res = await response.json();

    if (!response.ok) {
      alert(res.message || res.error);
      throw new Error("Error: " + response.statusText);
    }

    if (response.status === 200) {
      return res;
    } else {
      alert(res.message);
    }

    console.log(response);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// PUT one Employer
async function putOneEmployer(id, data) {
  try {
    const response = await fetch(`${api}employer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
        "mode": "no-cors",
      },
      body: JSON.stringify({
        ...data
      }),
    })

    const res = await response.json();

    if (!response.ok) {
      alert(res.message || res.error);
      throw new Error("Error: " + response.statusText);
    }

    if (response.status === 200) {
      alert(res.message);
      employerRender();
    }
  } catch (error) {
    console.log(error);
  }
}

// Edit Employer
const employerEditModal = document.getElementById("employerEditModal");
const employerClosingModal = document.getElementById("employerClosingModal");

async function employerEdit(id) {
  // Open modal
  employerEditModal.classList.remove("hidden");
  employerEditModal.classList.add("flex");

  const editEmployerForm = document.getElementById("editEmployerForm");

  const oneEmployer = await getOneEmployer(id);

  const { fullname, phone_number, password } = oneEmployer.data;

  editEmployerForm[0].value = fullname;
  editEmployerForm[1].value = phone_number;

  // Editing
  editEmployerForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    let fullname = event.target[0].value;
    let phone_number = event.target[1].value;

    const editObj = {
      fullname,
      phone_number,
      // password
    }

    console.log(editObj);

    putOneEmployer(id, editObj)
  });
}

// Close modal
function closeEmployerEditModal() {
  employerEditModal.classList.add("hidden");
  employerEditModal.classList.remove("flex");
}
