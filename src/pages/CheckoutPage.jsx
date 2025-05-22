import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ Random price between $9 and $20
  const [totalPrice] = useState(() => (Math.random() * (20 - 9) + 9).toFixed(1));

  const [email, setEmail] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [date, setDate] = useState('2025-06-01');
  const [cvv, setCvv] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Controls popup visibility

  const handlePayNow = () => {
    if (!email || !cardholder || !cardNumber || !cvv) {
      alert("Please fill all fields");
      return;
    }

    setShowSuccess(true); // ✅ Show success popup
  };

  const handleViewETicket = () => {
    navigate("/eticket", {
      state: { email, total: totalPrice, ...state } // ✅ Send all booking info
    });
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

        <div className="payment-method">
        <div className="card">
          <div className="card-header">
            <img src="./Business_Debit_Card_Image.png" alt="card" className="card-bg" />
          </div>
        </div>
      </div>

      <div className="payment-details">
        <h3>Payment Details</h3>

        <label>Your Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Cardholder Name</label>
        <input type="text" value={cardholder} onChange={(e) => setCardholder(e.target.value)} />

        <label>Card Number</label>
        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />

        <div className="row">
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label>CVV</label>
            <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </div>
        </div>

        <button type="button" className="pay-btn" onClick={handlePayNow}>
          <span>Pay Now</span>
          <span className="price">${totalPrice}</span>
        </button>
      </div>

      {/* ✅ Payment Success Popup with "See E-Ticket" Button */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2>🎉 Payment Successful!</h2>
            <button className="view-eticket-btn" onClick={handleViewETicket}>See E-Ticket</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;



