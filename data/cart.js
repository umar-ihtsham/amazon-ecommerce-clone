export const cart=[];




/* functions */

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
}