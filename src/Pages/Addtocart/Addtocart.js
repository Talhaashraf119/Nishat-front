import React, { useContext, useState } from 'react';
import { ContextCreate } from "../../Component/Contextapi/Context";
import "./addtocart.css";

import { Link, useNavigate} from 'react-router-dom';

const Addtocart = () => {
  const { data, setdata } = useContext(ContextCreate);

  const [quantities, setQuantities] = useState(
    Array.isArray(data)
      ? data.reduce((acc, item) => {
          acc[item.id] = item.quantity || 1;
          return acc;
        }, {})
      : {}
  );

  const increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
    updateCartItem(id, quantities[id] + 1);
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
    updateCartItem(id, quantities[id] > 1 ? quantities[id] - 1 : 1);
  };

  const updateCartItem = (id, quantity) => {
    const updatedCart = data.map((item) =>
      item._id === id ? { ...item, quantity } : item
    );
    setdata(updatedCart);
    localStorage.setItem("Addtocart", JSON.stringify(updatedCart));
  };

  const price = (item) => {
    const numericPrice = Number(item.price.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numericPrice)) {
      throw new Error(`Invalid price format: ${item.price}`);
    }
    return numericPrice * quantities[item.id];
  };

  const totalPrice = () => {
    return data.reduce((acc, item) => {
      const numericPrice = Number(item.price.replace(/[^0-9.-]+/g, ""));
      return acc + numericPrice * quantities[item.id];
    }, 0);
  };

  const deleteitem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setdata(updatedData);
    localStorage.setItem("Addtocart", JSON.stringify(updatedData));
  };

  // const result=JSON.parse(localStorage.getItem("Addtocart"))


  
  // const handleCheckout = async () => {
  //   try {
  //     await updatestock(); 
    
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Checkout Error',
  //       text: 'Something went wrong during the checkout process. Please try again.',
  //     });
  //   }
  // };
  const insan= useNavigate()
 const navigate=()=>{
 insan('/')

  }
  return (
    <>
    <div className='shopping-cart'><h1>Shopping Cart</h1></div>
      {data.length > 0 ? (
        <div className="cart-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="product-info">
                    <img
                    src={item.image}
                      // src={`http://localhost:5000/${item.image}`}
                      alt="image not found"
                      className="product-image"
                    />
                    <div className="product-details">
                      <p>{item.name}</p>
                      <button className="delete-button" onClick={() => deleteitem(item.id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                  <td className="product-price">
                  Rs. {item.price}
                  </td>
                  <td className="product-quantity">
                    <button className="quantity-button" onClick={() => decrement(item.id)}>-</button>
                    {quantities[item.id]}
                    <button className="quantity-button" onClick={() => increment(item.id)}>+</button>
                  </td>
                  <td className="product-total">
                   Rs. {item.price * quantities[item.id]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <p>Subtotal: Rs. {totalPrice()}</p>
        <Link to={'/checkout'}><button className="checkout-button" 
    
        >Check Out </button></Link>    
          </div>
        </div>
      ) : (
        <div className="empty-cart">
        <i className="fa fa-shopping-cart empty-cart-icon"></i>
        <h2>Your Cart is Empty.</h2>
        <p>
          Before proceeding to checkout you must add some products to your shopping cart.
          You will find a lot of interesting products on our "Shop" page.
        </p>
        <button className="return-to-shop-button" onClick={navigate}>
          Return to Shop
        </button>
      </div>
      )}
    </>
  );
};

export default Addtocart;
