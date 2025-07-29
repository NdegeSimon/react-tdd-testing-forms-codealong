// src/App.js
import { useState } from 'react';

function App() {
  const [pepperoniIsChecked, setPepperoniIsChecked] = useState(false);
  const [size, setSize] = useState('small');
  const [contactInfo, setContactInfo] = useState('');
  const [orderIsSubmitted, setOrderIsSubmitted] = useState(false);

  const togglePepperoni = () => {
    setPepperoniIsChecked(!pepperoniIsChecked);
  };

  const selectSize = (e) => {
    setSize(e.target.value);
  };

  const updateContactField = (e) => {
    setContactInfo(e.target.value);
  };

  const submitOrder = (e) => {
    e.preventDefault();
    setOrderIsSubmitted(true);
  };

  return (
    <div>
      <h1>Place an Order</h1>
      <p>
        Your selection: {size} {pepperoniIsChecked ? 'pepperoni' : 'cheese'}
      </p>
      
      <form onSubmit={submitOrder}>
        <div>
          <h3>Toppings</h3>
          <input
            type="checkbox"
            id="pepperoni"
            checked={pepperoniIsChecked}
            onChange={togglePepperoni}
            aria-checked={pepperoniIsChecked}
          />
          <label htmlFor="pepperoni">Add pepperoni</label>
        </div>
        
        <div>
          <h3>Size</h3>
          <label htmlFor="select-size">Select size: </label>
          <select 
            id="select-size" 
            value={size} 
            onChange={selectSize}
            aria-label="Select size"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        
        <div>
          <h3>Contact Info</h3>
          <label htmlFor="email">Enter your email address: </label>
          <input
            type="email"
            id="email"
            value={contactInfo}
            onChange={updateContactField}
            placeholder="email address"
            aria-label="Enter your email address"
          />
        </div>
        
        <button type="submit">Submit Order</button>
      </form>
      
      {orderIsSubmitted && (
        <h2 data-testid="confirmation">Thanks for your order!</h2>
      )}
    </div>
  );
}

export default App;