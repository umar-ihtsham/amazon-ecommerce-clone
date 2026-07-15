import {addToCart,cart,loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart',()=>{

        it('Add existing product to cart',()=>{
            spyOn(localStorage,'getItem').and.callFake(()=>{
                return JSON.stringify([{
                    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity:2,
                    deliveryoptionId:1
                }]);
            });

            spyOn(localStorage,'setItem');

            loadFromStorage();

            addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e",2);
            expect(cart[0].quantity).toEqual(2);
            expect(cart[1].quantity).toEqual(2);
            expect(cart.length).toEqual(2);
            expect(cart[1].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);   
        })



        it('Add new products to cart',()=>{

            spyOn(localStorage,'setItem');


            spyOn(localStorage,'getItem').and.callFake(()=>{
                return JSON.stringify([]);
            });
            loadFromStorage()


            addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",2);
            expect(cart.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
            expect(cart[0].quantity).toEqual(2);
        })

})