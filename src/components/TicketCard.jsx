import React from 'react';
import {
  Circle
} from '@mui/icons-material';

function TicketCard({ ticket}) {
  return (
    <div className="ticket-card">
      <div className='grey-3'>{ticket.id}</div>
      <div className='title'>{ticket.title}</div>
      <div className='grey-3 tag'>
        <Circle style={{fontSize: '0.8rem', margin: '5px'}}/>
        {ticket.tag[0]}
      </div>
    </div>
  );
}

export default TicketCard;
