import React, { useState } from 'react';
import '../CSS/orderform.css'; // Assuming you have a CSS file with the provided styles

function OrderForm() {
  const [items, setItems] = useState([{ item: '', quantity: '', unitPrice: '' }]);

  const addItem = () => {
    setItems([...items, { item: '', quantity: '', unitPrice: '' }]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className="container">
      <h2>Order Form</h2>
      <form id="orderForm">
        <label htmlFor="datetime">Date & Time:</label>
        <input type="datetime-local" id="datetime" name="datetime" required />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="deliveryAddress">Delivery Address:</label>
        <input type="text" id="deliveryAddress" name="deliveryAddress" required />

        <label htmlFor="restaurantName">Restaurant Name:</label>
        <input type="text" id="restaurantName" name="restaurantName" required />

        <label htmlFor="restaurantAddress">Restaurant Address:</label>
        <input type="text" id="restaurantAddress" name="restaurantAddress" required />

        <label htmlFor="packingCharge">Packing Charge:</label>
        <input type="number" id="packingCharge" name="packingCharge" min="0" required />

        <label htmlFor="deliveryCharge">Delivery Charge:</label>
        <input type="number" id="deliveryCharge" name="deliveryCharge" min="0" required /><br /><br />

        <label htmlFor="deliveryBoy">Delivery Boy:</label>
        <input type="text" id="deliveryBoy" name="deliveryBoy" required />

        <div id="itemsContainer" className="item-container">
          <label>Items:</label>
          {items.map((item, index) => (
            <div key={index} className="item">
              <input
                type="text"
                name="item[]"
                placeholder="Item"
                required
                value={item.item}
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].item = e.target.value;
                  setItems(updatedItems);
                }}
              />
              <input
                type="number"
                name="quantity[]"
                placeholder="Qty"
                min="1"
                required
                value={item.quantity}
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].quantity = e.target.value;
                  setItems(updatedItems);
                }}
              />
              <input
                type="number"
                name="unitPrice[]"
                placeholder="Unit Price"
                min="0.01"
                step="0.01"
                required
                value={item.unitPrice}
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].unitPrice = e.target.value;
                  setItems(updatedItems);
                }}
              />
              {index > 0 && <button type="button" className="remove-item" onClick={() => removeItem(index)}>Remove</button>}
            </div>
          ))}
        </div>
        <button type="button" className="add-item" onClick={addItem} id="addItem">Add Item</button>

        <input type="submit" value="Generate Invoice" />
      </form>
    </div>
  );
}

export default OrderForm;
