// Get All Employees for administration
async function adminGetAllEmployees(employer) {
  try {
    const response = await fetch(`${api}employee/`, {
      headers: {
        "Content-Type": "application/json",
        employer_id: employer,
        authorization: token.token,
      },
    });

    const res = await response.json();

    return res;

  } catch (error) {
    console.log(error);
  }
}

// Get One Employee
async function getOneEmployee(id) {
  try {
    const response = await fetch(`${api}employee${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
      },
    })

    const res = await response.json();

    return res;

  } catch (error) {
    console.log(error);
  }
}

// Delete employee
async function deleteOneEmployee(id) {
  try {
    const response = await fetch(`${api}employee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
      },
    });

    const res = await response.json();

    return res;

  } catch (error) {
    console.log(error);
  }
}
 
// Edit Employee