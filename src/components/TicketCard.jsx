// components/TicketCard.js
import React from 'react';
import '../App.css';

function TicketCard({ ticket }) {
  return (
    <div className="ticket-card">
      <h3>{ticket.id}</h3>
      <p>
        <input type="checkbox"></input>
        <label>{ticket.title}</label>
      </p>
      <p>{ticket.tag[0]}</p>
    </div>
  );
}

export default TicketCard;
