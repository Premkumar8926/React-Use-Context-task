import React, { createContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Cart Provider Component
const CartProvider = ({ children }) => {
  // Cart state: an array of products
  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState('free'); // shipping option

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product is already in the cart
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Update quantity if product already exists
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new product to cart with initial quantity
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to change the shipping option
  const changeShipping = (option) => {
    setShipping(option);
  };

  // Calculate total quantity and total amount
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        shipping,
        changeShipping,
        totalQuantity,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
