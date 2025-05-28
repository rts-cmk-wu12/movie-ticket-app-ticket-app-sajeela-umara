

import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode"; // <-- Import barcode
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const ETicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    movieId,
    selectedCinema,
    selectedDate,
    selectedTime,
    selectedSeats,
  } = location.state || {};



  const ticketRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const handleDownloadPDF = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = 180;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 15, 20, width, height);
    pdf.save("e-ticket.pdf");
    setShowPopup(true);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="eticket-page">
      <div className="eticket_header">
        <button className="back-arrow" onClick={() => navigate(-1)} aria-label="Go back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <h2 className='eticket_heading'>E-Ticket</h2>
      </div>
      <div className="eticket-instruction">
        <h3 className="eticket-details" >Instruction</h3>
        <p>
          Come to the cinema, show and scan the<br></br> barcode to the space provided. Continue to<br></br> comply with health protocols.

        </p>
      </div>

      <div className="eticket-card" ref={ticketRef}>
        <div className="eticket-header">

          <span>Order ID: #{Math.floor(Math.random() * 100000)}</span>
          <span className="e-ticket-label">E-TICKET </span>
        </div>

        <div className="eticket-details">
          <div>
            <p><strong>Film:</strong></p>
            <p><strong>Date:</strong></p>
            <p><strong>Time:</strong></p>
            <p><strong>Seats:</strong></p>
            <p><strong>Location:</strong></p>
            <p><strong>Payment:</strong></p>
          </div>
          <div>
            <p>{movieId || "N/A"}</p>
            <p>{selectedDate || "N/A"}</p>
            <p>{selectedTime || "N/A"}</p>
            <p>{selectedSeats?.join(", ") || "N/A"}</p>
            <p>{selectedCinema || "N/A"}</p>
            <p>✅ Success</p>
          </div>
        </div>

        <div className="barcode-section" style={{ background: "white", padding: "8px", display: "inline-block", }}>
          <Barcode
            value={`Movie:${movieId}-Seats:${selectedSeats?.join(",")}-Date:${selectedDate}`}
            format="CODE128"   // Common barcode format
            width={0.6}
            height={60}
            displayValue={true} // Show the barcode text below
          />
        </div>
      </div>

      <button className="download-btn" onClick={handleDownloadPDF}>
        📩 Download E-Ticket
      </button>

      {showPopup && (
        <div className="popup-overlay">

          <div className="popup_container">
            <img className="popup_image" src="public/icon-downloaded.png" alt="" />
            <h2 className="popup_container_heading">Your ticket has been<br></br> downloaded</h2>
            <p className="popup_container_p">Adele is a Scottish heiress whose extremely<br></br>
              wealthy family owns estates and grounds.<br></br>
              When she was a teenager. Read More</p>
            <button className="download_button" onClick={handleGoHome}>Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ETicketPage;

