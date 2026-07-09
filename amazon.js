
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
              src="images/ratings/rating-${(product.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
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

document.querySelector(".Js-products-grid").innerHTML=ProductsHTML;

document.querySelectorAll(".Js-add-to-cart")
.forEach((button)=>{
 button.addEventListener('click',()=>{
  const productId=button.dataset.productId;
  const productquantity=Number(document.querySelector(`.Js-quantity-selector-${productId}`).value);
  const addedMessage=document.querySelector(`.Js-added-to-cart-${productId}`);

  addedMessage.classList.add(`Js-added-to-cart-active`);

  setTimeout(()=>{addedMessage.classList.remove(`Js-added-to-cart-active`)},2000)

  let matchingitem;
  cart.forEach((item)=>{
    if(productId==item.productId){
      matchingitem=item}
  });


  if (matchingitem){
    matchingitem.quantity+=productquantity
  }else{
  cart.push({
    productId:productId,
    quantity:productquantity
  })
}

  let cartQuantity=0;

  cart.forEach((item)=>{
    cartQuantity+=item.quantity
  });
  document.querySelector('.Js-cart-quantity').innerText=cartQuantity;
  console.log(cartQuantity)
  console.log(cart)
 });

});


