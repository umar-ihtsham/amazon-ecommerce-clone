import { cartitems, renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "./data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
//import './data/backend-practice.js'
//import './data/cart-class.js'
//import './data/car.js'
loadProductsFetch().then(()=>{
    cartitems();
    renderOrderSummary();
    renderPaymentSummary();
})
    


