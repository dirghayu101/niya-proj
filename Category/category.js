import categories from "./CategoryJSON.js";
const categoryBtn = document.querySelector("#categoryBtn");
const categoryBtnBox = document.querySelector("#categoryBtnBox");
const firstCatBox = document.querySelector(".firstCatBox");
const secondCatBox = document.querySelector(".secondCatBox");
const thirdCatBox = document.querySelector(".thirdCatBox");
emptyBox(firstCatBox);
populateBox(Object.keys(categories), firstCatBox);

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

firstCatBox.querySelectorAll("span").forEach((span) => {
  addSpanListener(span);
});

function addSpanListener(span) {
  span.addEventListener("mouseover", (event) => {
    emptyBox(secondCatBox);
    const itemsList = getItemValue(event.target.textContent, categories);
    populateBox(itemsList, secondCatBox);
    secondCatBox.classList.remove("hideProps");
  });
  console.log(secondCatBox.querySelectorAll("span"));
  secondCatBox.querySelectorAll("span").forEach((span) => {
    console.log("Working");
    span.addEventListener("mouseover", (event) => {
      emptyBox(thirdCatBox);
      const itemsList = getItemValue(event.target.textContent, categories);
      populateBox(itemsList, thirdCatBox);
      thirdCatBox.classList.remove("hideProps");
    });
  });
}

function populateBox(arrValue, box) {
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
