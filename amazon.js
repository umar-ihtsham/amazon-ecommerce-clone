import {cart,addToCart,buttonAnimation,updatecartQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";


let ProductsHTML=''
products.forEach((product)=>{

  ProductsHTML+=`
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src='${product.getStarsUrl()}'>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="Js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}
          ${product.instInfoHTML()}
          ${product.WarrentyLinkHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart Js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary Js-add-to-cart " data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `
})

function cartQuantity(){
  let cartQuantity=updatecartQuantity();
  document.querySelector('.Js-cart-quantity').innerText=cartQuantity;
}
cartQuantity()

/* updates the cartQuantity */
document.querySelector(".Js-products-grid").innerHTML=ProductsHTML;

document.querySelectorAll(".Js-add-to-cart")
.forEach((button)=>{
 button.addEventListener('click',()=>{
  const productId=button.dataset.productId;
  const productquantity=Number(document.querySelector(`.Js-quantity-selector-${productId}`).value);
  const addedMessage=document.querySelector(`.Js-added-to-cart-${productId}`);
  buttonAnimation(addedMessage);
  addToCart(productId,productquantity);
  cartQuantity();

 });

});


