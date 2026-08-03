import { updatecartQuantity } from "./data/cart.js";
import { orders } from "./data/orders.js";
import { getProduct,loadProductsFetch, Product } from "./data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function cartQuantity(){
let cartQuantity = updatecartQuantity();
document.querySelector('.Js-tracking-cart-quantity').innerText = cartQuantity
}



function getDate(Time){
        
    let timestamp = Time;
    let date = new Date(timestamp);

    let result = date.toLocaleDateString('en-US', {
    weekday:'long',
    month: 'long',
    day: '2-digit'
    }).replace(' ', ' ');

    return result;
}

async function loadproducts(){

    let trackingHTML='';

    await loadProductsFetch().then(()=>{
const url=window.location.search;

const searchHere=new URLSearchParams(url);

const productId=searchHere.get('productid');
const orderId=searchHere.get('orderid');


let matchingProduct=getProduct(productId);
orders.forEach((order)=>{
    if(order.id===orderId){
        order.products.forEach((product)=>{
            if (product.productId===productId){

                const orderTime = dayjs(order.orderTime);
                const deliveryTime = dayjs(product.estimatedDeliveryTime);
                const currentTime = dayjs();

/*                 const progress =((currentTime - orderTime) / (deliveryTime - orderTime)) * 100; */

                let progress =
                ((currentTime.valueOf() - orderTime.valueOf()) /
                    (deliveryTime.valueOf() - orderTime.valueOf())) * 100;


                    progress=Math.round(progress);
                    console.log(progress)

                    let preparingClass = '';
                    let shippedClass = '';
                    let deliveredClass = '';

                    if (progress < 50) {
                    preparingClass = 'current-status';
                    } else if (progress < 100) {
                    shippedClass = 'current-status';
                    } else {
                    deliveredClass = 'current-status';
                    }

               trackingHTML+=`

                <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on: ${getDate(product.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${product.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
        <div class="progress-label ${preparingClass}">
            Preparing
        </div>

        <div class="progress-label ${shippedClass}">
            Shipped
        </div>

        <div class="progress-label ${deliveredClass}">
            Delivered
        </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
      </div>
                
                `
            }
        })
    }
})
});

document.querySelector('.Js-main').innerHTML=trackingHTML;

}

cartQuantity();
loadproducts();