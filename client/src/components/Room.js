import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("📌 Room.js - Received Dates -> From:", fromdate, "To:", todate);

  // Ensure the button is disabled if no dates are selected
  const isBookingDisabled = !fromdate || !todate;

  // Encode dates safely
  const safeFromDate = fromdate ? encodeURIComponent(fromdate) : "";
  const safeToDate = todate ? encodeURIComponent(todate) : "";

  console.log(`🛠️ Generating Booking Link -> /book/${room._id}/${safeFromDate}/${safeToDate}`);

  return (
    <div className="room-card">
      <img src={room.imageurls[0]} className="room-img" alt="Room" />

      <h2>{room.name}</h2>

      <b>
        <p>Max Count: {room.maxcount}</p>
        <p>Phone: {room.phonenumber}</p>
        <p>Type: {room.type}</p>
      </b>

      {/* "Book Now" button is disabled if no dates are selected */}
      <Link to={isBookingDisabled ? "#" : `/book/${room._id}/${safeFromDate}/${safeToDate}`}>
        <Button className="btn btn-primary m-2" disabled={isBookingDisabled}>
          Book Now
        </Button>
      </Link>

      <Button className="btn-primary" onClick={handleShow}>
        View Details
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Show second image if available, otherwise show first image */}
          <img 
            src={room.imageurls[1] ? room.imageurls[1] : room.imageurls[0]} 
            className="modal-img" 
            alt="Room" 
          />
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
