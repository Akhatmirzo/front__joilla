const token = JSON.parse(localStorage.getItem("token"));

// Register Employer
async function registerEmployer(reqBody) {
  try {
    const response = await fetch(`${api}employer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token.token,
        mode: "no-cors",
      },
      body: JSON.stringify(reqBody),
    });

    const res = await response.json();

    if (!response.ok) {
      alert(res.message || res.error);
      throw new Error("Error: " + response.statusText);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
}

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

    return res;
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

    alert(res.message || res.error);
    return res;

  } catch (error) {
    console.log(error);
  }
}

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

    return res;

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
        mode: "no-cors",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    const res = await response.json();

    if (!response.ok) {
      alert(res.message || res.error);
      throw new Error("Error: " + response.statusText);
    }

    return res;

  } catch (error) {
    console.log(error);
  }
}
