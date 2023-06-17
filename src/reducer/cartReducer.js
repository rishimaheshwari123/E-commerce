
const cartReducer = (state, action ) => {

 if(action.type === "ADD_TO_CART"){
    let {id, color, amount, product} =  action.payload;
    
    //  takel the existing product 

    let existingProduct = state.cart.find((currItem) => currItem.id === id+color);

    if(existingProduct){
        let updatedProduct  = state.cart.map((currElem) => {
            if(currElem.id === id+color){
                let newAmount = currElem.amount + amount;

                if(newAmount >= currElem.max){
                    newAmount =  currElem.max;
                }
                return {
                    ...currElem,
                    amount : newAmount,
                };
            }else{
                return currElem;
            }
        });
        return{
            ...state,
            cart : updatedProduct, 
        };
    }
    else{
        let cartProduct = {
        id : id + color,
        name : product.name,
        color ,
        amount,
        image  : product.image[0].url,
        price : product.price,
        max : product.stock,
    }

    return {
        ...state,
        cart: [...state.cart, cartProduct],

    };
  }
 }


//  set increment and decriment 

if(action.type === "SET_DECREMENT"){
    let updatedProduct  = state.cart.map((currElem) =>{
        if(currElem.id === action.payload){
            let decAmount  =  currElem.amount - 1;

            if(decAmount <= 1){
                decAmount = 1;
            }
            return {
                ...currElem,
                amount : decAmount,
            };
        }
        else{
            return currElem;
        }
    });
    return{
        ...state,
        cart : updatedProduct,
    }
}
if(action.type === "SET_INCREMENT"){
    let updatedProduct  = state.cart.map((currElem) =>{
        if(currElem.id === action.payload){
            let incAmount  =  currElem.amount + 1;

            if(incAmount >= currElem.max){
                incAmount = currElem.max;
            }
            return {
                ...currElem,
                amount : incAmount,
            };
        }
        else{
            return currElem;
        }
    });
    return{
        ...state,
        cart : updatedProduct,
    }
}

 if(action.type ===  "ROMOVE_ITEM"){

    let updatedCart = state.cart.filter(
        (currItem) => currItem.id !==  action.payload
        );
    return{
        ...state,
        cart : updatedCart,
    }
 }

// to clear the cart 
 if(action.type === "CLEAR_CART"){
    return{
        ...state,
        cart : [],
    }
 }


 if(action.type === "CART_TOTAL_ITEM"){
    let updatedItemVal = state.cart.reduce((initialVal, currElem) =>{
        let {amount} = currElem;
        initialVal = initialVal+amount;

        return initialVal;
    }, 0);
    return{
        ...state,
        total_item : updatedItemVal,
    }
 }


if(action.type === "CART_TOTAL_PRICE"){
    let total_price  =  state.cart.reduce((initialVal, currElem) =>{
        let {price, amount} =  currElem;

        initialVal = initialVal + price * amount;

        return initialVal;
    },0);

    return {
        ...state,
        total_price,
    }
}


  return state;
}

export default cartReducer
