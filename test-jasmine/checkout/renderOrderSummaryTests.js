import { renderOrderSummary } from "../../checkout/orderSummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";


describe('test suite: renderOrderSummary',()=>{


    const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
    const productId3="83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

    beforeAll((done)=>{
        loadProducts(()=>{
        done();
        });
    });

    beforeEach(()=>{
            document.querySelector(".Js-test-container").innerHTML=`
                <div class="Js-order-summary"></div>
                <div class="Js-payment-summary"></div>
                <div class="Js-cart-quantity-checkout"></div>
        `;

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                { productId: productId1, quantity: 2 ,deliveryoptionId:'1'},
                { productId: productId2, quantity: 1 ,deliveryoptionId:'2'},
                { productId: productId3, quantity: 3 ,deliveryoptionId:'3'}
            ]);
        });

        spyOn(localStorage,'setItem');

        loadFromStorage();

        renderOrderSummary();
    });




    it('displays the cart',()=>{

        expect(
        document.querySelectorAll(".Js-cart-item-container").length
        ).toEqual(3)
        expect(
        document.querySelector(`.Js-product-quantity-${productId1}`).innerText
        ).toContain("Quantity: 2")
        expect(
        document.querySelector(`.Js-product-quantity-${productId2}`).innerText
        ).toContain("Quantity: 1")
        expect(
        document.querySelector(`.Js-product-quantity-${productId3}`).innerText
        ).toContain("Quantity: 3")


        
    })



    it('removes a product from cart', ()=>{
        

        document.querySelector(`.Js-delete-link-${productId1}`).click();

        expect(
        document.querySelectorAll(".Js-cart-item-container").length
        ).toEqual(2)
        expect(
            document.querySelector(`.Js-cart-item-container-${productId1}`)
        ).toEqual(null)
        expect(
            document.querySelector(`.Js-cart-item-container-${productId2}`)
        ).not.toEqual(null)
        expect(cart.length).toEqual(2);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[1].quantity).toEqual(3);
        
    })

    afterEach(()=>{
        document.querySelector('.Js-test-container').innerHTML=``
    })
})