import categories from "./CategoryJSON.js";

const addEventCategoryBtnBox = () => {
  const categoryBtn = document.querySelector("#categoryBtn");
  const categoryBtnBox = document.querySelector("#categoryBtnBox");
  categoryBtnBox.addEventListener("mouseover", (event) => {
    categoryBtn.classList.add("categoryBtnRotate");
    categoryBtn.classList.remove("categoryBtnRotateBack");
    if (categoryBtnBox.querySelector(".categoryBox") === null) {
      putCategoryBox(Object.keys(categories), categoryBtnBox);
    }
  });

  categoryBtnBox.addEventListener("mouseout", (event) => {
    categoryBtn.classList.add("categoryBtnRotateBack");
    categoryBtn.classList.remove("categoryBtnRotate");
    // removeCategoryBoxes();
  });
};

const addEventCategoryBox = () => {
  const categoryItem = document.querySelectorAll(".categoryBox span");
  categoryItem.forEach((item) => {
    item.addEventListener("mouseover", (event) => {
      const itemObj = getItemValue(event.target.textContent, categories);
      console.log(Object.keys(itemObj));
      putCategoryBox(Object.keys(itemObj));
    });
  });
};

addEventCategoryBtnBox();
addEventCategoryBox();

// This function will calculate the width from the left to place the div.
function getWidth() {
  const boxesNum = document.querySelectorAll("#categoryBtnBox .categoryBox");
  const x = Object.keys(boxesNum).length;
  return `${x * 8 + 7.2}vw`;
}

// This function will place the div
function putCategoryBox(categoryArr, parent) {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "categoryBox";
  //   Dynamic width generator here 7vw
  categoryDiv.style.left = getWidth();
  categoryArr.forEach((category) => {
    const categorySpan = document.createElement("span");
    categorySpan.textContent = category;
    categoryDiv.appendChild(categorySpan);
  });
  parent.appendChild(categoryDiv);
  addEventCategoryBox();
}

// This function will
function removeCategoryBoxes() {
  const categoryBoxes = document.querySelectorAll(".categoryBox");
  categoryBoxes.forEach((box) => {
    box.remove();
  });
}

function getItemValue(key, object) {
  if (key in object) {
    return object[key];
  }

  for (let prop in object) {
    if (typeof object[prop] === "object") {
      const result = getItemValue(key, object[prop]);
      if (result) {
        return result;
      }
    }
  }

  return null;
}
