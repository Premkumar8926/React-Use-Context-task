import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import productsData from "./products.json"; // Ensure the JSON data is stored as products.json in the src folder

const ProductList = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // Helper function to check if a product is in the cart
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {productsData.products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} width="50" />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            {isInCart(product.id) ? (
              <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
