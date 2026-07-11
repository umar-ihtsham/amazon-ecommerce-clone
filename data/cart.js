export let cart = JSON.parse(localStorage.getItem('cart'))

if (!cart) {
    cart = [
        { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2 },
        { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1 },
        { productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e", quantity: 3 }
    ]
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
        quantity:productquantity
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

export function updatecartQuantity(){
  let cartQuantity=0;
  cart.forEach((cartitem)=>{
    cartQuantity+=cartitem.quantity
  });
  return cartQuantity
}