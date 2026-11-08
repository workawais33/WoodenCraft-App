import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("woodenCraftCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("woodenCraftCart", JSON.stringify(updatedCart));
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );

      saveCart(updatedCart);
      return;
    }

    const updatedCart = [
      ...cartItems,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity,
      },
    ];

    saveCart(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    );

    saveCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;