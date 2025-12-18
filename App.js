import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const menuItems = [
    {
      id: 1,
      name: "Filter Coffee",
      price: 20,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
    },
    {
      id: 2,
      name: "Tea",
      price: 10,
      image: "https://plus.unsplash.com/premium_photo-1670954418690-37e178110999?w=400"
    },
    {
      id: 3,
      name: "Sandwich",
      price: 60,
      image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=400"
    },
    {
      id: 4,
      name: "French Fries",
      price: 80,
      image: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=400"
    },
    {
      id: 5,
      name: "Burger",
      price: 120,
      image: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=400"
    }
  ];

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cafeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cafeCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const found = cart.find(c => c.id === item.id);
    if (found) {
      setCart(cart.map(c =>
        c.id === item.id ? { ...c, qty: c.qty + 1 } : c
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  return (
    <div className="app">
      <h1>☕ Billa Cafe</h1>
      <p className="center">Experience the best coffee and snacks in town!</p>
      <p className="center"><strong>Mudinja Oru Cup Coffee!</strong></p>
      

      {/* MENU SECTION */}
      <section className="menu-section">
        <h2>Menu</h2>
        <div className="menu">
          {menuItems.map(item => (
            <div className="card" key={item.id}>
              <div className="image-box">
                <img src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => addToCart(item)}>Add</button>
            </div>
          ))}
        </div>
      </section>

      {/* CART SECTION */}
      <section className="cart-section">
        <h2>🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <button onClick={() => decreaseQty(item.id)}>-</button>
                        {item.qty}
                        <button onClick={() => increaseQty(item.id)}>+</button>
                      </td>
                      <td>₹{item.price * item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bill">
              <p>Subtotal: ₹{subtotal}</p>
              <p>GST (5%): ₹{gst.toFixed(2)}</p>
              <h3>Total: ₹{total.toFixed(2)}</h3>
              <button onClick={() => window.print()}>Print Bill</button>
            </div>
          </>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Billa Cafe. Location: Chennai, Tamil Nadu.</p>
        <p><strong>Created by Naveen Murugesan</strong></p>
        <span>Contact: 9025986880</span>
      </footer>
    </div>
  );
}

export default App;
