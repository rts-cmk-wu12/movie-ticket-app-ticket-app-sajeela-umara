/*import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const BookTicket = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const cinemas = ['Empire XXI Yogyakarta', 'CGV Transmart', 'XXI Plaza Ambarrukmo'];
  const dates = ['20 May 2025', '21 May 2025', '22 May 2025'];
  const times = ['10.00 AM', '01.00 PM', '04.00 PM', '07.00 PM'];

  const [selectedCinema, setSelectedCinema] = useState(cinemas[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const reservedSeats = ['2-4', '2-5', '3-3', '3-6', '4-2', '4-3', '4-4', '4-5', '4-6'];

  const toggleSeat = (row, col) => {
    const seatId = `${row}-${col}`;
    if (reservedSeats.includes(seatId)) return;
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]
    );
  };

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        movieId,
        selectedCinema,
        selectedDate,
        selectedTime,
        selectedSeats,
        seatCount: selectedSeats.length // ✅ send seat count
      }
    });
  };

  return (
    <div className="ticket-container">
      <h2>Select Seats</h2>

      <div className="form-group">
        <label>Cinema</label>
        <select value={selectedCinema} onChange={e => setSelectedCinema(e.target.value)}>
          {cinemas.map(cinema => (
            <option key={cinema} value={cinema}>{cinema}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
            {dates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Time</label>
          <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
            {times.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="screen"></div>

      <div className="seats-grid">
        {Array.from({ length: 6 }, (_, row) => (
          <div className="seat-row" key={row}>
            {Array.from({ length: 8 }, (_, col) => {
              const seatId = `${row + 1}-${col + 1}`;
              const isReserved = reservedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              let seatClass = 'seat';
              if (isReserved) seatClass += ' reserved';
              else if (isSelected) seatClass += ' selected';

              return (
                <div
                  key={col}
                  className={seatClass}
                  onClick={() => toggleSeat(row + 1, col + 1)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="legend">
        <div><span className="seat selected" /> Selected</div>
        <div><span className="seat reserved" /> Reserved</div>
        <div><span className="seat" /> Available</div>
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default BookTicket;*/

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookTicket = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const cinemas = ['Empire XXI Yogyakarta', 'CGV Transmart', 'XXI Plaza Ambarrukmo'];
  const dates = ['20 May 2025', '21 May 2025', '22 May 2025'];
  const times = ['10.00 AM', '01.00 PM', '04.00 PM', '07.00 PM'];

  const [selectedCinema, setSelectedCinema] = useState(cinemas[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const reservedSeats = ['2-4', '2-5', '3-3', '3-6', '4-2', '4-3', '4-4', '4-5', '4-6'];

  const toggleSeat = (row, col) => {
    const seatId = `${row}-${col}`;
    if (reservedSeats.includes(seatId)) return;
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]
    );
  };
const handleCheckout = () => {

   if (selectedSeats.length === 0) {
    alert('Please select at least one seat before proceeding to checkout.');
    return;
  }

  navigate('/checkout', {
    state: {
      movieId,
      selectedCinema,
      selectedDate,
      selectedTime,
      selectedSeats,
      seatCount: selectedSeats.length // ✅ Properly send seat count
    }
  });
};


  return (
    <div className="ticket-container">
      <h2>Select Seats</h2>

      <div className="form-group">
        <label>Cinema</label>
        <select value={selectedCinema} onChange={e => setSelectedCinema(e.target.value)}>
          {cinemas.map(cinema => (
            <option key={cinema} value={cinema}>{cinema}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
            {dates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Time</label>
          <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
            {times.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="screen"></div>

      <div className="seats-grid">
        {Array.from({ length: 6 }, (_, row) => (
          <div className="seat-row" key={row}>
            {Array.from({ length: 8 }, (_, col) => {
              const seatId = `${row + 1}-${col + 1}`;
              const isReserved = reservedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              let seatClass = 'seat';
              if (isReserved) seatClass += ' reserved';
              else if (isSelected) seatClass += ' selected';

              return (
                <div
                  key={col}
                  className={seatClass}
                  onClick={() => toggleSeat(row + 1, col + 1)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="legend">
        <div><span className="seat selected" /> Selected</div>
        <div><span className="seat reserved" /> Reserved</div>
        <div><span className="seat" /> Available</div>
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default BookTicket;
