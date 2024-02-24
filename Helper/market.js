// Add Market
async function addMarket(market) {
    try {
        const response = await fetch(`${api}market`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token.token,
            },
    
            body: JSON.stringify(market),
        })
    
        const res = await response.json();
    
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return res;
    } catch (error) {
        console.log(error);
    }
}

// Market pagination get all
async function getMarketPaginations(page = 1, pageSize = 10) {
    try {
        const response = await fetch(`${api}market/pagination?page=${page}&pageSize=${pageSize}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: token.token,
            },
        })
    
        const res = await response.json();

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return res;
    } catch (error) {
        console.log(error);
    }
}

// Get one market
async function getOneMarket(id) {
    try {
        const response = await fetch(`${api}market/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: token.token,
            },
        })

        const res = await response.json();

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return res;
    } catch (error) {
        console.log();
    }
}

// Update market
async function updateOneMarket(id, data) {
    try {
        const response = await fetch(`${api}market/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: token.token,
            },
            body: JSON.stringify(data),
        })

        const res = await response.json();
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return res;
    } catch (error) {
        console.log(error);
    }
}

// Delete market
async function deleteMarket(id) {
    try {
        const response = await fetch(`${api}market/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: token.token,
            },
        })

        const res = await response.json();

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return res;
    } catch (error) {
        console.log();
    }
}