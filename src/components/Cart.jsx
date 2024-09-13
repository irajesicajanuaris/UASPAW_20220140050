import React from "react";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Keranjang Belanja</h2>
      {cart.length === 0 ? (
        <p>Keranjang belanja kosong</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Harga: Rp{item.price.toLocaleString()}</p>
              <p>
                Jumlah:
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </p>
              <button onClick={() => removeFromCart(item.id)}>Hapus</button>
            </div>
          ))}
          <p>Total: Rp{total.toLocaleString()}</p>
          <button onClick={clearCart}>Kosongkan Keranjang</button>
        </>
      )}
    </div>
  );
};

export default Cart;
