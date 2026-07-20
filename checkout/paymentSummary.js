import {cart} from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { updatecartQuantity } from "../data/cart.js";
import { addToOrders } from "../data/orders.js";

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0
    cart.forEach((cartItem)=>{
        let productId=cartItem.productId
        let product=getProduct(productId);
        productPriceCents+=product.priceCents*cartItem.quantity;


        const deliveryOption=getDeliveryOption(cartItem.deliveryoptionId);
        shippingPriceCents+=deliveryOption.priceCents;
    });
    const totalBeforeTaxPriceCents= productPriceCents+shippingPriceCents;
    const taxPriceCents=totalBeforeTaxPriceCents*0.1;
    const totalCents=totalBeforeTaxPriceCents+taxPriceCents;
    

    const paymentSummaryHTML=`
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="Js-cart-quantity"></div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxPriceCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary Js-place-order">
            Place your order
          </button>
    `;
    document.querySelector(".Js-payment-summary").innerHTML=paymentSummaryHTML;

    let cartQuantity=updatecartQuantity();
    document.querySelector('.Js-cart-quantity').innerText=`items (${cartQuantity})`

    document.querySelector('.Js-place-order').addEventListener('click',async ()=>{

      try{
       const response=await fetch('https://supersimplebackend.dev/orders',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            cart:cart
          }),
        })

        const order=await response.json();
        addToOrders(order);
      } catch (error){
        console.log('Unexpected error occured. please try again');
      }

      window.location.href='orders.html'
    });
}