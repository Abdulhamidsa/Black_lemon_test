const plusIcons = document.querySelectorAll(".plus-icon");
const paragraphs = document.querySelectorAll(".product-info p");
const minusButton = document.querySelector(".quantity-button:first-of-type");
const plusButton = document.querySelector(".quantity-button:last-of-type");
const quantityInput = document.querySelector(".quantity-input");
const slider = document.querySelector("#slider");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
let slideIndex = 1;
let startX;
let currentX;
let isSwiping;
let isAdded = false;
plusIcons.forEach(function (plusIcon, index) {
  plusIcon.addEventListener("click", function () {
    if (paragraphs[index].classList.contains("hidden")) {
      paragraphs.forEach(function (paragraph) {
        paragraph.classList.add("hidden");
      });
      plusIcons.forEach(function (icon) {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      });
      paragraphs[index].classList.remove("hidden");
      plusIcon.classList.remove("fa-plus");
      plusIcon.classList.add("fa-minus");
    } else {
      paragraphs[index].classList.add("hidden");
      plusIcon.classList.remove("fa-minus");
      plusIcon.classList.add("fa-plus");
    }
  });
});
minusButton.addEventListener("click", function () {
  let value = parseInt(quantityInput.value);
  if (value > 1) {
    value -= 1;
  }
  quantityInput.value = value;
});
plusButton.addEventListener("click", function () {
  let value = parseInt(quantityInput.value);
  value += 1;
  quantityInput.value = value;
});
showSlides(slideIndex);
slider.addEventListener("touchstart", function (event) {
  startX = event.touches[0].clientX;
  isSwiping = true;
});
slider.addEventListener("touchmove", function (event) {
  if (!isSwiping) {
    return;
  }
  currentX = event.touches[0].clientX;
});
slider.addEventListener("touchend", function (event) {
  if (!isSwiping) {
    return;
  }
  isSwiping = false;
  let deltaX = currentX - startX;
  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      showSlides((slideIndex -= 1));
    } else {
      showSlides((slideIndex += 1));
    }
  }
});
function showSlides(n) {
  let i;
  let products = document.querySelectorAll(".product");
  if (n > products.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = products.length;
  }
  for (i = 0; i < products.length; i++) {
    products[i].style.display = "none";
  }
  for (i = slideIndex - 1; i < slideIndex + 2; i++) {
    if (products[i]) {
      products[i].style.display = "block";
    }
  }
}
leftArrow.addEventListener("click", function () {
  showSlides((slideIndex -= 1));
});
rightArrow.addEventListener("click", function () {
  showSlides((slideIndex += 1));
});
document.getElementById("add-to-cart").addEventListener("click", function () {
  if (isAdded) {
    return;
  }
  this.innerHTML = "ADDED";
  this.classList.toggle("added");
  if (!document.querySelector(".red-circle")) {
    document.getElementById("shopping-cart-icon").innerHTML += '<div class="red-circle"></div>';
  }
  setTimeout(function () {
    document.getElementById("add-to-cart").innerHTML = "ADD TO CART";
    document.getElementById("add-to-cart").classList.remove("added");
    isAdded = false;
    document.getElementById("add-to-cart").disabled = false;
  }, 2000);
  isAdded = true;
  this.disabled = true;
});
