import { cartitems, renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch, products } from "./data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
//import './data/backend-practice.js'
//import './data/cart-class.js'
//import './data/car.js'

async function loadPage(){
    console.log('load products')
    try{
    await loadProductsFetch();
    } catch (error){
        console.log('unexpected error.')
    };
    cartitems();
    renderOrderSummary();
    renderPaymentSummary();
};

loadPage();