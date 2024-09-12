import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/style';
import EventCard from "./EventCard";
import Loader from '../../Layout/Loader';

const Events = () => {
  const { allevents, isLoading } = useSelector((state) => state.event);  

  if (isLoading) {
    return <Loader/>; // Or use a proper loader component
  }

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>
      <div className="w-full grid">
        {allevents && allevents.length > 0 ? (
          allevents.map((event) => (
            <EventCard key={event._id} data={event} />
          ))
        ) : (
          <h4>No Events have!</h4>
        )}
      </div>
    </div>
  );
};

export default Events;
