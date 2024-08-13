import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./CartPage.css"; // Import the CSS file

const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalQuantity,
    totalAmount,
    shipping,
    changeShipping,
  } = useContext(CartContext);

  const shippingCost = shipping === "cost" ? 20 : 0;
  const totalWithShipping = totalAmount + shippingCost;

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.title} width="50" />
              </td>
              <td>{item.title}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button
                  className="quantity-button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h2>Total Quantity: {totalQuantity}</h2>
        <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
        <div className="shipping-options">
          <label>Shipping: </label>
          <button
            className={`shipping-button ${
              shipping === "free" ? "selected" : ""
            }`}
            onClick={() => changeShipping("free")}
          >
            Free
          </button>
          <button
            className={`shipping-button ${
              shipping === "cost" ? "selected" : ""
            }`}
            onClick={() => changeShipping("cost")}
          >
            Cost ($20)
          </button>
        </div>
        <div>
          <h3>
            Selected Shipping:{" "}
            {shipping === "free"
              ? "Free (standard delivery time)"
              : "Cost ($20, 1-day delivery)"}
          </h3>
        </div>
        <h2>Total Amount with Shipping: ${totalWithShipping.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CartPage;
