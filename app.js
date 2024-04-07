const cartIcon = document.querySelector(".cartIcon");
const body = document.querySelector("body");

cartIcon.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
