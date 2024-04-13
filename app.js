const cartIcon = document.querySelector(".cartIcon");
const close = document.querySelector(".close");
const body = document.querySelector("body");
const addBtn = document.querySelectorAll(".add-btn");
const item = document.querySelectorAll(".products .item");
const listCart = document.querySelector(".listCart-items");
let arrayDeObjetos = [];

class newProduct {
  constructor(id, imagem, itemName, itemValue) {
    this.id = id;
    this.imagem = imagem;
    this.itemName = itemName;
    this.itemValue = itemValue;
  }
}

cartIcon.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

close.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

addBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    let parentElement = btn.parentElement;
    let id = index;
    let img = parentElement.querySelector(".item-img img").getAttribute("src");
    let itemName = parentElement.querySelector(".item-name").innerHTML;
    let itemValue = parentElement
      .querySelector(".item-value")
      .innerHTML.slice(2);

    if (listCart.children.length == 0) {
      let novoObjeto = new newProduct(index, img, itemName, itemValue);
      arrayDeObjetos.push(novoObjeto);
      addProduct(id, img, itemName, itemValue);
    } else {
      let existeProduct = arrayDeObjetos.some(
        (productId) => productId.id === index
      );
      if (existeProduct) {
        console.log("Existe");
        arrayDeObjetos.forEach(function (objeto, arrayId, array) {
          if (objeto.id === index) {
            array[arrayId].itemValue = 500;
          }
        });
      } else {
        console.log("não existe");
        let novoObjeto = new newProduct(index, img, itemName, itemValue);
        arrayDeObjetos.push(novoObjeto);
        addProduct(id, img, itemName, itemValue);
      }
    }

    console.log(arrayDeObjetos);

    //addProduct(index, img, itemName, itemValue);
  });
});

function addProduct(id, imagem, itemName, itemValue) {
  let product = document.createElement("div");
  product.classList.add("item");
  product.innerHTML = ` <div class="image">
  <img src="${imagem}" alt="">
</div>
<div class="name">
  ${itemName}
</div>
<div class="totalPrice"> $ 
  ${itemValue}
</div>
<div class="quantity">
  <span class="minus">
    < </span>
      <span>0</span>
      <span class="plus">></span>
</div>`;

  listCart.appendChild(product);
}
