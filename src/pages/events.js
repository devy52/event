import React from 'react';
import './events.css';

const EventList = ({ events, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {event.date}
            <button onClick={() => onDelete(event.id)}>Delete</button>
            <button onClick={() => onEdit(event)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
