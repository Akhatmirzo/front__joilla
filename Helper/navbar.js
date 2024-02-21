const navbarList = document.querySelector(".navbar__list");
const mainWrap = document.querySelector("#mainWrap");

let navbarListChild = navbarList.children;
let mainWrapChild = mainWrap.children;

for (let i = 0; i < navbarListChild.length; i++) {
  if (i > 0) {
    if (i == 1) {
      navbarListChild[i].addEventListener("click", () => {
        navbarListChild[0].style.top = 0 + "px";
        sectionNone();
        mainWrapChild[navbarListChild[i].value].style.display = "block";
      });
    } else {
      navbarListChild[i].addEventListener("click", () => {
        navbarListChild[0].style.top = i * 48 - 48 + "px";
        sectionNone();
        mainWrapChild[navbarListChild[i].value].style.display = "block";
      });
    }
  }
}

function sectionNone(isBasic = false) {
  for (let i = 0; i < mainWrapChild.length; i++) {
    mainWrapChild[i].style.display = "none";
  }

  if (isBasic) {
    mainWrapChild[0].style.display = "block";
  }
}

sectionNone(true);