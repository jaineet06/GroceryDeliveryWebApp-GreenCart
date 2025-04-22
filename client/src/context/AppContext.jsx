import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const mode = import.meta.env.VITE_DEMO_MODE

  const [user, setUser] = useState(false);
  const [seller, setSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  //fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setSeller(true);
      } else {
        setSeller(false);
      }
    } catch (error) {
      setSeller(false);
    }
  };

  //fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // add product to cart
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  //Update cart item quantity
  const updateCart = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId] = quantity;

    setCartItems(cartData);

    toast.success("Cart Updated");
  };

  //Remove product from cart
  const removeCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    toast.success("Removed from Cart");
    setCartItems(cartData);
  };

  //Get cart item amount cart
  const getCartCount = () => {
    let totalCnt = 0;
    for (const item in cartItems) {
      totalCnt += cartItems[item];
    }
    return totalCnt;
  };

  //Get cart Total amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }

    return Math.floor(totalAmount);
  };

  // Fetch User data and cart items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchSeller();
  }, []);

  // Update database cart items
  useEffect(() => {
    const updateCart = async () => {
        
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message)
      }
    };

    if(user){
        updateCart()
    }
  }, [cartItems]);

  const values = {
    navigate,
    user,
    setSeller,
    setUser,
    seller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    updateCart,
    removeCart,
    cartItems,
    setCartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    mode
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
