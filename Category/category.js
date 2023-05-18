import categories from "./CategoryJSON.js";
const categoryBtn = document.querySelector("#categoryBtn");
const categoryBtnBox = document.querySelector("#categoryBtnBox");
const firstCatBox = document.querySelector(".firstCatBox");
const secondCatBox = document.querySelector(".secondCatBox");
const thirdCatBox = document.querySelector(".thirdCatBox");

function populateBox(arrValue, box) {
  emptyBox(box);
  arrValue.forEach((value) => {
    const span = document.createElement("span");
    span.textContent = value;
    box.appendChild(span);
  });
}

function emptyBox(box) {
  const allSpans = box.querySelectorAll("span");
  allSpans.forEach((span) => {
    span.remove();
  });
}

function hideAllBoxes() {
  firstCatBox.classList.add("hideProps");
  secondCatBox.classList.add("hideProps");
  thirdCatBox.classList.add("hideProps");
}

function getItemValue(key, object) {
  function findValue(obj, searchKey) {
    if (obj.hasOwnProperty(searchKey)) {
      return obj[searchKey];
    }

    for (let prop in obj) {
      if (typeof obj[prop] === "object") {
        const result = findValue(obj[prop], searchKey);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  const result = findValue(object, key);
  return result ? Object.keys(result) : null;
}

function firstHoverListener() {
  categoryBtnBox.addEventListener("mouseover", (event) => {
    categoryBtn.classList.add("categoryBtnRotate");
    categoryBtn.classList.remove("categoryBtnRotateBack");
    firstCatBox.classList.remove("hideProps");
  });
  categoryBtnBox.addEventListener("mouseleave", (event) => {
    categoryBtn.classList.add("categoryBtnRotateBack");
    categoryBtn.classList.remove("categoryBtnRotate");
    hideAllBoxes();
  });
}

function secondHoverListener() {
  firstCatBox.querySelectorAll("span").forEach((span) => {
    span.addEventListener("mouseover", (event) => {
      thirdCatBox.classList.add("hideProps");
      const itemList = getItemValue(event.target.textContent, categories);
      populateBox(itemList, secondCatBox);
      secondCatBox.classList.remove("hideProps");
      thirdHoverListener();
    });
  });
}

function thirdHoverListener() {
  secondCatBox.querySelectorAll("span").forEach((span) => {
    span.addEventListener("mouseover", (event) => {
      const itemList = getItemValue(event.target.textContent, categories);
      populateBox(itemList, thirdCatBox);
      thirdCatBox.classList.remove("hideProps");
    });
  });
}

function main() {
  populateBox(Object.keys(categories), firstCatBox);
  firstHoverListener();
  secondHoverListener();
}

main();
