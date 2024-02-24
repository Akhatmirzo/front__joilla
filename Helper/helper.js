// ! ----------------------------------------------------------------Token----------------------------------------------------------------
const token = JSON.parse(localStorage.getItem("token"));
// function isTOken
function isToken(page) {
  const roles = ["admin", "employer", "employee"];
  const dashboardPage = [
    "../admin/adminDashboard.html",
    "../pages/employerDashboard.html",
    "../pages/employeeDashboard.html",
  ];
  const role = JSON.parse(localStorage.getItem("token"));

  if (!role || role === undefined || role === null) {
    window.location.href = "../index.html";
  } else if (role) {
    roles.forEach((rol, index) => {
      if (rol !== page && role.role === rol) {
        window.location.href = dashboardPage[index];
      }
    });
  }
}
// ! ----------------------------------------------------------------Signup----------------------------------------------------------------
// Sign out function
function signOut() {
  localStorage.removeItem("token");
  window.location.reload();
}

// ! ----------------------------------------------------------------API----------------------------------------------------------------
// const api = "http://localhost:8767/api/v1/";
const api = "https://joilla-market.onrender.com/api/v1/";

// ! ----------------------------------------------------------------Render----------------------------------------------------------------
// Render paginations Product
let page = localStorage.getItem("page") || localStorage.setItem("page", 1);
let pageMarket =
  localStorage.getItem("pageMarket") || localStorage.setItem("pageMarket", 1);

function pagination(data, type = "paginationList") {
  let isLocalStorePage = type == "paginationList" ? "page" : "pageMarket";
  page = localStorage.getItem(`${isLocalStorePage}`);

  const pagination = document.getElementById(type);
  let isActivePage = false;
  let allProPages = Math.ceil(data.all / 10);
  let isPage = allProPages == data.page;

  if (data.page == 1) {
    pagination.children[0].style.opacity = 0.5;
    pagination.children[0].setAttribute("disabled", true);
  } else if (data.page > 1) {
    pagination.children[0].style.opacity = 1;
    pagination.children[0].removeAttribute("disabled");
    pagination.children[0].setAttribute("onclick", `prevBtn()`);
  }

  if (isPage) {
    pagination.children[2].style.opacity = 0.5;
    pagination.children[2].setAttribute("disabled", true);
  } else {
    pagination.children[2].style.opacity = 1;
    pagination.children[2].removeAttribute("disabled");
    pagination.children[2].setAttribute("onclick", `nextBtn()`);
  }

  if (allProPages > 3) {
    pagination.children[1].innerHTML = "";

    for (
      let i = page == 1 ? data.page : data.page - 1;
      i <= (allProPages == page ? allProPages : data.page + 1);
      i++
    ) {
      isActivePage = page == i;
      const template = `
        <li
          class="relative block rounded ${
            isActivePage
              ? "bg-[#000] text-[#fff]"
              : "bg-transparent text-[#000]"
          } px-3 py-1.5 text-sm cursor-pointer"
        value="${i}"
        onclick=(renderProductPaginations(${i}))
        >
          ${i}
        </li>
      `;

      pagination.children[1].innerHTML += template;
    }
  } else {
    pagination.children[1].innerHTML = "";
    for (let i = 1; i <= allProPages; i++) {
      isActivePage = page == i;
      const template = `
        <li
          class="relative block rounded ${
            isActivePage
              ? "bg-[#000] text-[#fff]"
              : "bg-transparent text-[#000]"
          } px-3 py-1.5 text-sm cursor-pointer"
        value="${i}"
        onclick=(renderProductPaginations(${i}))
        >
          ${i}
        </li>
      `;

      pagination.children[1].innerHTML += template;
    }
  }
}
function paginationMarket(data, type = "paginationList") {
  let isLocalStorePage = type == "paginationList" ? "page" : "pageMarket";
  page = localStorage.getItem(`${isLocalStorePage}`);

  const pagination = document.getElementById(type);
  let isActivePage = false;
  let allProPages = Math.ceil(data.all / 10);
  let isPage = allProPages == data.page;

  if (data.page == 1) {
    pagination.children[0].style.opacity = 0.5;
    pagination.children[0].setAttribute("disabled", true);
  } else if (data.page > 1) {
    pagination.children[0].style.opacity = 1;
    pagination.children[0].removeAttribute("disabled");
    pagination.children[0].setAttribute("onclick", `marketprevBtn()`);
  }

  if (isPage) {
    pagination.children[2].style.opacity = 0.5;
    pagination.children[2].setAttribute("disabled", true);
  } else {
    pagination.children[2].style.opacity = 1;
    pagination.children[2].removeAttribute("disabled");
    pagination.children[2].setAttribute("onclick", `marketnextBtn()`);
  }

  if (allProPages > 3) {
    pagination.children[1].innerHTML = "";

    for (
      let i = page == 1 ? data.page : data.page - 1;
      i <= (allProPages == page ? allProPages : data.page + 1);
      i++
    ) {
      isActivePage = page == i;
      const template = `
        <li
          class="relative block rounded ${
            isActivePage
              ? "bg-[#000] text-[#fff]"
              : "bg-transparent text-[#000]"
          } px-3 py-1.5 text-sm cursor-pointer"
        value="${i}"
        onclick=(renderMarketPaginations(${i}))
        >
          ${i}
        </li>
      `;

      pagination.children[1].innerHTML += template;
    }
  } else {
    pagination.children[1].innerHTML = "";
    for (let i = 1; i <= allProPages; i++) {
      isActivePage = page == i;
      const template = `
        <li
          class="relative block rounded ${
            isActivePage
              ? "bg-[#000] text-[#fff]"
              : "bg-transparent text-[#000]"
          } px-3 py-1.5 text-sm cursor-pointer"
        value="${i}"
        onclick=(renderMarketPaginations(${i}))
        >
          ${i}
        </li>
      `;

      pagination.children[1].innerHTML += template;
    }
  }
}

function prevBtn() {
  renderProductPaginations(Number(page) - 1);
}

function nextBtn() {
  renderProductPaginations(Number(page) + 1);
}
function marketprevBtn() {
  renderProductPaginations(Number(pageMarket) - 1);
}

function marketnextBtn() {
  renderProductPaginations(Number(pageMarket) + 1);
}

// Loading
function loading(loaderPage) {
  const loader = `
  <div id="loading-basic-example" class="absolute top-0 left-0 bg-[#eee] z-[9999999999] h-[calc(90vh)] w-full flex items-center justify-center">
    <div
      data-te-loading-management-init
      data-te-parent-selector="#loading-basic-example" class="flex items-center justify-center gap-1">
      <div
        data-te-loading-icon-ref
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"></div>
      <span data-te-loading-text-ref>Loading...</span>
    </div>
  </div>
  `;

  loaderPage.innerHTML = loader;
}
