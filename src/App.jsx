import React from "react";
import { CartProvider } from "./CartContext";
import CartPage from "./CartPage";
import ProductList from "./ProductList";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <ProductList />
        <CartPage />
      </div>
    </CartProvider>
  );
}

export default App;
