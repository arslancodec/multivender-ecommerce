import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Route/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allevents, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className=" event-list">
            {allevents && allevents.length > 0 ? (
              allevents.map((event) => (
                <EventCard key={event._id} active={true} data={event} />
              ))
            ) : (
              <p>No events available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
