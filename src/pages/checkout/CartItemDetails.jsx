import { formatMoney } from "../../utils/money";
import axios from 'axios';
import { useState } from 'react';

export function CartItemDetails({cartItem, loadCart}) {
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const [updatingQuantity, setUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async() => {
    if(updatingQuantity){
      setUpdatingQuantity(false);
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      });
      await loadCart();
    }
    else {setUpdatingQuantity(true);}
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };



  return (
    <div className="cart-item-details">
      <div className="product-name">{cartItem.product.name}</div>
      <div className="product-price">
        {formatMoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        <span>
          Quantity: 
          {updatingQuantity && <input type="text" className="quantity-textbox" value={quantity} onChange={updateQuantityInput} onKeyDown={(event) => {
            if(event.key === 'Enter'){updateQuantity()}
            else if(event.key === 'Escape'){setQuantity(cartItem.quantity); setUpdatingQuantity(false);}
          }} />}
          <span className="quantity-label">{quantity}</span>
        </span>
        <span className="update-quantity-link link-primary" onClick={updateQuantity}>Update</span>
        <span className="delete-quantity-link link-primary"onClick={deleteCartItem}>Delete</span>
      </div>
    </div>
  );
}
