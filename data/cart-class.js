class Cart{
    cartItems = undefined;
    #localStorageKey=undefined;


    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }


    #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))

        if (!this.cartItems) {
            this.cartItems = [
                { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2 ,deliveryoptionId:'1'},
                { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1 ,deliveryoptionId:'2'},
                { productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e", quantity: 3 ,deliveryoptionId:'3'}
            ]
        }
        };

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems))
        };

    buttonAnimation(addedMessage){
        addedMessage.classList.add(`Js-added-to-cart-active`);
        setTimeout(()=>{addedMessage.classList.remove(`Js-added-to-cart-active`)},2000)
        };

    addToCart(productId,productquantity){
        let matchingitem;
        this.cartItems.forEach((cartitem)=>{
            if(productId==cartitem.productId){
            matchingitem=cartitem}
        });


        if (matchingitem){
            matchingitem.quantity+=productquantity
        }else{
        this.cartItems.push({
            productId:productId,
            quantity:productquantity,
            deliveryoptionId:'1'
        })
        }
        this.saveToStorage()
        };

    removeFromCart(productId){
    let newCart=[];
    this.cartItems.forEach((cartitem)=>{
    if(cartitem.productId != productId){
        newCart.push(cartitem)
    }})

    this.cartItems=newCart
    this.saveToStorage()
        };

    
    updateQuantity(productId,newQuantity){
    this.cartItems.forEach((cartitem)=>{
    if(cartitem.productId===productId){
    cartitem.quantity=newQuantity
    }
    })
    this.saveToStorage()
        };

    updatecartQuantity(){
    let cartQuantity=0;
    this.cartItems.forEach((cartitem)=>{
        cartQuantity+=cartitem.quantity
    });
    return cartQuantity
        };

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingitem;
        this.cartItems.forEach((cartitem)=>{
            if(productId==cartitem.productId){
            matchingitem=cartitem}
        });
        matchingitem.deliveryoptionId=deliveryOptionId
        this.saveToStorage();
        }
       
}


const cart= new Cart('cart-oop');
const businessCart= new Cart('cart-business')

cart.addToCart()
businessCart.addToCart()

console.log(cart)
console.log(businessCart)