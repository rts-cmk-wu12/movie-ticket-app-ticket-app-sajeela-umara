import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ETicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, selectedCinema, selectedDate, selectedTime, selectedSeats } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);

  const handleDownloadTicket = () => {
    setShowPopup(true); // ✅ Show popup when clicking download
  };

  const handleGoHome = () => {
    navigate("/"); // ✅ Navigate to home page
  };

  return (
    <div className="eticket-container">
      <div className="eticket-card">
        <h2 className="eticket-title">E-Ticket 🎟️</h2>

        <p className="instruction">
          Come to the cinema, show and scan the barcode in the space provided.  
          Continue to comply with health protocols.
        </p>

        <div className="eticket-details">
          <p><strong>Film:</strong> {movieId || "N/A"}</p>
          <p><strong>Date:</strong> {selectedDate || "N/A"}</p>
          <p><strong>Seats:</strong> {selectedSeats?.join(", ") || "No seats selected"}</p>
          <p><strong>Location:</strong> {selectedCinema || "N/A"}</p>
          <p><strong>Time:</strong> {selectedTime || "N/A"}</p>
          <p><strong>Payment:</strong> ✅ Successful</p>
          <p><strong>Order ID:</strong> {Math.floor(Math.random() * 1000000)}</p>
        </div>

        {/* ✅ Barcode Placeholder */}
        <div className="barcode">
          <img src="https://via.placeholder.com/200x50?text=BARCODE" alt="barcode" />
        </div>

        {/* ✅ Download Button */}
        <button className="download-btn" onClick={handleDownloadTicket}>
          📩 Download E-Ticket
        </button>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2>✅ E-Ticket Downloaded Successfully!</h2>
            <button className="home-btn" onClick={handleGoHome}>Go to Home Page</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ETicket;
