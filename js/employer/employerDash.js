isToken("employer");

const employerForm = document.querySelector("#employeeForm");
const employeeTable = document.getElementById("employeeTable");

// Register employee
employerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = e.target[0].value;
  const phone_number = e.target[1].value;
  const password = e.target[2].value;

  const employee = {
    fullname,
    phone_number,
    password,
  };

  const result = await registerEmployee(employee);

  alert(result.message);
  renderEmployees();
});

// Render employee
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

// Add products
const ProductForm = document.getElementById("ProductForm");

ProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let code = e.target[0];
  let name = e.target[1];
  let qty = e.target[2];
  let price = e.target[3];
  let unit = e.target[4];

  const product = {
    code: code.value,
    name: name.value,
    qty: qty.value,
    price: price.value,
    unit: unit.value,
  };

  const result = await addProduct(product);

  alert(result.message);
  renderProductPaginations(page);
  ProductForm.reset();
});

// Render product paginations
const productsBody = document.getElementById("productsBody");

async function renderProductPaginations(page) {
  loading(productsBody);
  try {
    const result = await getProductPagination(page);
    let resData = result.data || [];

    if (resData.length > 0) {
      productsBody.innerHTML = "";
      resData.forEach((product, index) => {
        const { code, name, qty, price, unit, _id } = product;
        const template = `
        <tr class="border-y-2">
          <td class="border-x-2 text-center">${index + 1}</td>
          <td class="border-x-2 text-center">${code}</td>
          <td class="border-x-2 text-center">${name}</td>
          <td class="border-x-2 text-center">${qty}</td>
          <td class="border-x-2 text-center">${price}so'm/<span>${unit}</span></td>
          <td class="flex items-center justify-end gap-1">
            <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onclick="openProductEditModal('${_id}')"
            >
              Edit
            </button>

            <button type="button" onclick="deleteOneProduct('${_id}')" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
          </td>
        </tr>
        `;

        productsBody.innerHTML += template;
      });
    } else {
      productsBody.innerHTML = `<h1 class="absolute top-1/2 left-1/2 translate-x-[-50%] text-gray-700 text-3xl">No Products Found</h1>`;
    }

    localStorage.setItem("page", page);
    pagination(result);
  } catch (error) {
    console.log(error);
  }
}

renderProductPaginations(page);

// Delete product
async function deleteOneProduct(id) {
  const result = await deleteProduct(id);
  alert(result.message);
  renderProductPaginations(page);
}

// Edit modal
const productEditModal = document.getElementById("productEditModal");
const editProductForm = document.getElementById("editProductForm");

// Open modal
async function openProductEditModal(id) {
  productEditModal.classList.remove("hidden");
  productEditModal.classList.add("flex");

  const result = await getOneProduct(id);

  const { code, name, qty, price, unit, _id } = result.data;
  editProductForm[0].value = code;
  editProductForm[1].value = name;
  editProductForm[2].value = qty;
  editProductForm[3].value = price;
  editProductForm[4].value = unit;

  editProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let code = event.target[0].value;
    let name = event.target[1].value;
    let qty = event.target[2].value;
    let price = event.target[3].value;
    let unit = event.target[4].value;

    const reqResult = { code, name, qty, price, unit };

    const res = await updateProduct(_id, reqResult);

    alert(res.message);
    closeProductEditModal();
    renderProductPaginations(page);
  });
}

// Close modal
function closeProductEditModal() {
  productEditModal.classList.add("hidden");
  productEditModal.classList.remove("flex");
}

// Employer Market Add
const MarketForm = document.getElementById("MarketForm");

MarketForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let market_name = e.target[0].value;
  let phone_number = e.target[1].value;
  let location = e.target[2].value;

  const market = {
    market_name,
    phone_number,
    location,
  };

  const result = await addMarket(market);
  alert(result.message);
  MarketForm.reset();
  renderMarketPaginations(page);
});

// Render market paginations
const marketsBody = document.getElementById("marketsBody");
let marketPage = localStorage.getItem("pageMarket");

async function renderMarketPaginations(page) {
  loading(marketsBody);
  try {
    const result = await getMarketPaginations(page);
    let resData = result.data || [];

    if (resData.length > 0) {
      marketsBody.innerHTML = "";
      resData.forEach((market, index) => {
        const { market_name, phone_number, location, _id } = market;
        const template = `
        <tr class="border-y-2">
          <td class="border-x-2 text-center">${index + 1}</td>
          <td class="border-x-2 text-center">${market_name}</td>
          <td class="border-x-2 text-center">${phone_number}</td>
          <td class="border-x-2 text-center">${location}</td>
          <td class="flex items-center justify-end gap-1">
            <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onclick="openMarketEditModal('${_id}')"
            >
              Edit
            </button>

            <button type="button" onclick="deleteOneMarket('${_id}')" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
          </td>
        </tr>
        `;

        marketsBody.innerHTML += template;
      });
    } else {
      marketsBody.innerHTML = `<h1 class="absolute top-1/2 left-1/2 translate-x-[-50%] text-gray-700 text-3xl">No Markets Found</h1>`;
    }

    localStorage.setItem("pageMarket", page);
    paginationMarket(result, "paginationMarketList");
  } catch (err) {
    console.log(err);
  }
}

renderMarketPaginations(marketPage);

// Edit modal Market
const marketEditModal = document.getElementById("marketEditModal");
const editMarketForm = document.getElementById("editMarketForm");

// Open modal
async function openMarketEditModal(id) {
  marketEditModal.classList.remove("hidden");
  marketEditModal.classList.add("flex");

  const result = await getOneMarket(id);

  const { market_name, phone_number, location, _id } = result.data;
  editMarketForm[0].value = market_name;
  editMarketForm[1].value = phone_number;
  editMarketForm[2].value = location;

  editMarketForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let market_name = event.target[0].value;
    let phone_number = event.target[1].value;
    let location = event.target[2].value;

    const reqResult = { market_name, phone_number, location };

    const res = await updateOneMarket(_id, reqResult);

    alert(res.message);
    closeProductEditModal();
    renderMarketPaginations(marketPage);
  });
}
// Close modal
function closeMarketEditModal() {
  marketEditModal.classList.add("hidden");
  marketEditModal.classList.remove("flex");
}

// Delete market

async function deleteOneMarket(id) {
  const result = await deleteMarket(id);
  alert(result.message);
  renderMarketPaginations(marketPage);
}