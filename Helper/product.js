
// Add Product
async function addProduct(product) {
    const response = await fetch(`${api}product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: token.token,
        },
        body: JSON.stringify(product),
    })

    const res = await response.json();

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return res;
}

// Get product pagination
async function getProductPagination(page = 1, pageSize = 10) {
    const response = await fetch(`${api}product/pagination?page=${page}&pageSize=${pageSize}`, {
        headers: {
            "Content-Type": "application/json",
            authorization: token.token,
        },
    })

    const res = await response.json();

    return res
}

// Get One Product
async function getOneProduct(id) {
    try {
        const response = await fetch(`${api}product/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: token.token,
            },
        })

        const res = await response.json();

        if (!response.ok) {
            throw new Error(res.error || response.statusText);
        }

        return res;
    } catch (error) {
        console.log(error);
    }
}
 
// Delete product
async function deleteProduct(id) {
    try {
        const response = await fetch(`${api}product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: token.token,
            },
        })

        const res = await response.json();

        if (!response.ok) {
            throw new Error(res.error || response.statusText);
        }

        return res;
    } catch (error) {
        console.log(error);
    }
} 

// PUT Product
async function updateProduct(id, data) {
    try {
        const response = await fetch(`${api}product/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: token.token,
            },

            body: JSON.stringify(data)
        });

        const res = await response.json();

        if (!response.ok) {
            throw new Error(res.error || response.statusText);
        }

        return res;
    } catch (error) {
        console.log(error);
    }
}
