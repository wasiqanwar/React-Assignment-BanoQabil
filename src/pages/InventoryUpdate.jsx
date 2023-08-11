import { useState, useEffect } from "react";
import "../index.css";

export const InventoryUpdate = () => {
  const [items, setItems] = useState(() => {
    const existingProducts = localStorage.getItem("items");
    return existingProducts ? JSON.parse(existingProducts) : [];
  });

  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemUnit, setItemUnit] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      name: itemName,
      qty: Number(itemQty),
      unit: itemUnit,
    };

    setItems([...items, newItem]);
    setItemName("");
    setItemQty("");
    setItemUnit("");
  };

  const handleIncrement = (item) => {
    const updatedItems = items.map((x) => {
      if (x === item) {
        return {
          ...x,
          qty: x.qty + 1,
        };
      }
      return x;
    });

    setItems(updatedItems);
  };

  const handleDecrement = (item) => {
    const updatedItems = items.map((x) => {
      if (x === item && x.qty > 0) {
        return {
          ...x,
          qty: x.qty - 1,
        };
      }
      return x;
    });

    setItems(updatedItems);
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="container">
      <h1>Inventory</h1>

      <form onSubmit={handleSubmit} className="formOutline">
        <div className="entryForm">
          <label className="entryLine">
            Item Name:
            <input
              type="text"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
            />
          </label>
          {/* <br /> */}
          <label className="entryLine">
            Quantity:
            <input
              type="number"
              value={itemQty}
              onChange={(event) => setItemQty(event.target.value)}
            />
          </label>
          {/* <br /> */}
          <label className="entryLine">
            Unit:
            <input
              type="text"
              value={itemUnit}
              onChange={(event) => setItemUnit(event.target.value)}
            />
          </label>
        </div>
        {/* <br /> */}
        <button type="submit">Add Item</button>
      </form>
      <br />

      <br />
      {items.length === 0 && <p>Please add an item!</p>}

      <table className="table">
        <thead>
          <tr className="tableLine">
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Increase/Decrease</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="tableLine">
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.unit}</td>
              <td>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDecrement(item)}>-</button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
