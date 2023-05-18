import group from "./CategoryJSON.js";

const menu = document.getElementById("menu");
menu.style.display = "none";

let visible = false;

// Prepare sub menu
const sub = document.getElementById("menu-sub");

// Populate main menu
const main = document.getElementById("menu-main");
Object.keys(group).forEach((name) => {
  const item = document.createElement("li");
  const textNode = document.createTextNode(name);
  item.appendChild(textNode);
  main.appendChild(item);

  item.addEventListener("mouseover", (e) => {
    emptyBox(sub);

    getItemValue(e.target.textContent, group).forEach((item) => {
      const node = document.createElement("li");
      node.appendChild(document.createTextNode(item));
      sub.appendChild(node);
    });
  });
});

// Hide menu if hover out
menu.addEventListener("mouseleave", () => toggleMenu(false));

function getItemValue(key, object) {
  if (key in object) {
    return Object.keys(object[key]);
  }

  for (let prop in object) {
    if (typeof object[prop] === "object") {
      const result = getItemValue(key, object[prop]);
      if (result) {
        return Object.keys(result);
      }
    }
  }

  return null;
}

function emptyBox(box) {
  const allSpans = box.querySelectorAll("li");
  allSpans.forEach((span) => {
    span.remove();
  });
}

const btnMenu = document.getElementById("btn-menu");
btnMenu.addEventListener("click", () => {
  toggleMenu(!visible);
});

const toggleMenu = (state) => {
  visible = state;

  if (visible) {
    menu.style.display = "flex";
    btnMenu.innerHTML = "V";
  } else {
    menu.style.display = "none";
    btnMenu.innerHTML = ">";
  }
};
