"# front\_\_joilla"

<!-- Api -->
<!-- todo API = https://joilla-market.onrender.com/ -->

<!--! Admin Register -->
<!--
    API = https://joilla-market.onrender.com/api/v1/admin/register

    methos: POST

    header {
        "Content-Type": "application/json",
    }

    body {
        email,
        password
    }

    <!-- ! Response status: 201 //
    {
        message: "Admin created successfully",
        token,
    }
-->

<!--! Admin Login -->
<!--
    API = https://joilla-market.onrender.com/api/v1/admin/register

    methos: POST

    header {
        "Content-Type": "application/json",
    }

    body {
        email,
        password
    }

    <!-- ! Response status: 201 //
    {
        message: "Admin successfully authenticated",
        token,
    }
-->

<!--! Employer Register -->
<!--
    API = https://joilla-market.onrender.com/api/v1/employer

    method: POST

    header {
        "Content-Type": "application/json",
        authorization: admin_token
    }

    body {
        fullname,
        phone_number,
        password,
    }

    <!-- ! Response status: 201 //
    {
      message: "Employer created successfully",
    }
 -->

<!--! Employer Login -->
<!--
    API = https://joilla-market.onrender.com/api/v1/employer/login

    method: POST

    header {
        "Content-Type": "application/json"
    }

    body {
        phone_number,
        password,
    }

    <!-- ! Response status: 200 //
    {
        message: "Employer successfully logged in",
        token,
    }
 -->

<!-- ! GET ALL Employer -->
<!--
    API = https://joilla-market.onrender.com/api/v1/employer/

    method: GET

    header {
        "Content-Type": "application/json",
        authorization: admin_token,
    }

    <!-- ! Response Status: 200 //
    { message: "Employees were found", employers: [...employers] }
 -->

 <!--! GET One Employer -->
<!--
    API = https://joilla-market.onrender.com/api/v1/employer/{id}

    method: GET

    if (id == "me") {
        header: {
            "Content-Type": "application/json",
            employerId: id
        }
    } else {
        header: {
            "Content-Type": "application/json",
            authorization: admin_token,
        }
    }

    <!-- ! Response Status: 200 //
    {
        message: "Employer was found",
        data: employer,
    }
 -->

 <!--! Employer Delete -->

<!-- 
    API = https://joilla-market.onrender.com/api/v1/employer/{id}

    method = "DELETE"

    headers = {
        authorization: admin_token,
    }

    <!-- ! Response Status: 200 //
    {
        message: "Employer successfully deleted",
        employer,
    }
    
 -->

<!-- ! Edit Employer -->
<!-- 
    API = https://joilla-market.onrender.com/api/v1/employer/{id}

    method: "PUT"

    Header {
        "Content-Type": "application/json",
        authorization: token,
    }

    <!-- ! Response Status: 200 //
    {
        message: "Employer successfully updated",
        employer,
    }
 -->
