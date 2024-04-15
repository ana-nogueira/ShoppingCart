const cartIcon = document.querySelector(".cartIcon");
const close = document.querySelector(".close");
const body = document.querySelector("body");
const listProductHtml = document.querySelector(".listProduct");
const listCart = document.querySelector(".listCart-items");
const cartIconNumber = document.querySelector(".cartIcon-number");
let incrementCartNumber = 0;
let listProduct = [];
let cart = [];

cartIcon.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

close.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

function addDataToHtml() {
  listProductHtml.innerHTML = "";
  if (listProduct.length > 0) {
    listProduct.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `<div class="item-img">
      <img src=${product.image}>
      </div>
      <h3 class="item-name">${product.name}</h3>
      <span class="item-value">$ ${product.price}</span>
      <button class="add-btn">Add To Cart</button>`;
      listProductHtml.appendChild(newProduct);
    });
  }
}

listProductHtml.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("add-btn")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
});

function addToCart(product_id) {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHtml();
}

function addCartToHtml() {
  listCart.innerHTML = "";
  let productsQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      productsQuantity += item.quantity;
      let currentProduct = listProduct.findIndex(
        (value) => value.id == item.product_id
      );
      let newProductInCart = document.createElement("div");
      newProductInCart.classList.add("item");
      newProductInCart.dataset.cartId = item.product_id;
      newProductInCart.innerHTML = ` <div class="image">
    <img src=${listProduct[currentProduct].image} alt="">
  </div>
  <div class="name">
    ${listProduct[currentProduct].name}
  </div>
  <div class="totalPrice">
    R$ ${listProduct[currentProduct].price * item.quantity}
  </div>
  <div class="quantity">
    <span class="minus">
      < </span>
        <span>${item.quantity}</span>
        <span class="plus">></span>
  </div>`;
      listCart.appendChild(newProductInCart);
      cartIconNumber.innerText = productsQuantity;
    });
  } else {
    cartIconNumber.innerText = productsQuantity;
  }
}

listCart.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let type = positionClick.getAttribute("class");
    let id =
      positionClick.parentElement.parentElement.getAttribute("data-cart-id");
    changeProductQuantity(id, type);
  }
});

function changeProductQuantity(id, type) {
  let findProductPosition = cart.findIndex((value) => value.product_id == id);
  if (cart[findProductPosition].quantity <= 1 && type === "minus") {
    cart.splice(findProductPosition, 1);
  } else if (cart[findProductPosition].quantity >= 1 && type === "minus") {
    cart[findProductPosition].quantity = cart[findProductPosition].quantity - 1;
  } else if (type === "plus") {
    cart[findProductPosition].quantity = cart[findProductPosition].quantity + 1;
  }
  addCartToHtml();
}

function initApp() {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      addDataToHtml();
    });
}
initApp();
