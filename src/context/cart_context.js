import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("rishiCart");
  if (localCartData === []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add item form cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // increase and dcrease 
  const setDecrease = (id) =>{
      dispatch({type:"SET_DECREMENT" , payload: id})
  }

  const setIncrement = (id) =>{
      dispatch({type:"SET_INCREMENT" , payload: id})
  }


  // remove item form cart
  const removeItem = (id) => {
    dispatch({ type: "ROMOVE_ITEM", payload: id });
  };

  // to cleare the cart 
  const clearCart = () =>{
    dispatch({type : "CLEAR_CART"})
  }


  // add the data form local storage  (get of set methods)

  useEffect(() => {
    dispatch({type: "CART_TOTAL_ITEM"});
    dispatch({type : "CART_TOTAL_PRICE"});
    localStorage.setItem("rishiCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem,clearCart,setDecrease, setIncrement}}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
