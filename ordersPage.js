import { updatecartQuantity,addToCart } from "./data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { orders } from "./data/orders.js";
import { getProduct,loadProductsFetch } from "./data/products.js";

function getDate(Time){
        
    let timestamp = Time;
    let date = new Date(timestamp);

    let result = date.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit'
    }).replace(' ', '-');

    return result;
}


async function loadOrdersPage() {
    
await loadProductsFetch();

let orderHTML='';
orders.forEach((order)=>{

    if (!order.products || order.products.length === 0) {
        return;
    }


    let productsHTML='';

        if (orders===[]){
            console.log('no item in the cart || no order is placed')
        }else{
            (order.products || []).forEach((product)=>{

                const productId=product.productId;

                let matchingProduct=getProduct(productId);

            productsHTML+=`

                <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${getDate(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message Js-buy-again-message-link"
                data-product-id='${matchingProduct.id}'
                data-product-quantity='${product.quantity}'
                >Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
          
                <button class="track-package-button button-secondary Js-track-package-button-link"
                data-product-id='${matchingProduct.id}';
                data-order-id='${order.id}'
                >
                  Track package
                </button>

            </div>
          </div>

            `
        })}


    orderHTML+=`
    <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${getDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

        ${productsHTML}
        
    </div>
    `

})

document.querySelector('.Js-orders-grid').innerHTML = orderHTML;

}
loadOrdersPage().then(()=>{
    document.querySelectorAll(`.Js-buy-again-message-link`).forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        const quantity=Number(link.dataset.productQuantity)
                addToCart(productId,quantity);
                cartQuantity();
            })
        })  
    }).then(()=>{

  document.querySelectorAll('.Js-track-package-button-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      const orderId=link.dataset.orderId;
      window.location.href=`tracking.html?productid=${productId}&orderid=${orderId}`
    })
  })
})






function cartQuantity(){
let cartQuantity = updatecartQuantity();
document.querySelector('.Js-cart-quantity-orders').innerText = cartQuantity
}
cartQuantity();