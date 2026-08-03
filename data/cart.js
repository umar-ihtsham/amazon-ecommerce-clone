export let cart;

loadFromStorage();

export function loadFromStorage(){
      cart = JSON.parse(localStorage.getItem('cart'))

if (!cart) {
    cart = [];
}
}

/* functions */

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export function buttonAnimation(addedMessage){
        addedMessage.classList.add(`Js-added-to-cart-active`);
        setTimeout(()=>{addedMessage.classList.remove(`Js-added-to-cart-active`)},2000)
}


export function addToCart(productId,productquantity){
          let matchingitem;
      cart.forEach((cartitem)=>{
        if(productId==cartitem.productId){
          matchingitem=cartitem}
      });


      if (matchingitem){
        matchingitem.quantity+=productquantity
      }else{
      cart.push({
        productId:productId,
        quantity:productquantity,
        deliveryoptionId:'1'
      })
    }
    saveToStorage()
}

export function removeFromCart(productId){
    let newCart=[];
    cart.forEach((cartitem)=>{
      if(cartitem.productId != productId){
        newCart.push(cartitem)
      }})

      cart=newCart
      saveToStorage()
}

export function updateQuantity(productId,newQuantity){
    cart.forEach((cartitem)=>{
    if(cartitem.productId===productId){
      if (newQuantity<=0){
        removeFromCart(productId);
      }else{
      cartitem.quantity=newQuantity
      }
    }
    })
    saveToStorage()
}

export function updatecartQuantity(){
  let cartQuantity=0;
  cart.forEach((cartitem)=>{
    cartQuantity+=cartitem.quantity
  });
  return cartQuantity
}


export function updateDeliveryOption(productId,deliveryOptionId){
      let matchingitem;
      cart.forEach((cartitem)=>{
        if(productId==cartitem.productId){
          matchingitem=cartitem}
      });
      matchingitem.deliveryoptionId=deliveryOptionId
      saveToStorage();
}