import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Spinner, Alert, Modal } from "react-bootstrap";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51R45PyBMbwUDnFnL2zYMTSqhDEdtCGql5OQtLIJHvfnRqTR1H6kGCebkFRgzKIcxBqOSrDFbaqbxv8oLgrniNhna00mbw0bP14");

function Bookingscrren() {
  let { roomid, fromdate, todate } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [showModal, setShowModal] = useState(false);

  const momentFromDate = moment(fromdate, "DD-MM-YYYY");
  const momentToDate = moment(todate, "DD-MM-YYYY");
  const totaldays = momentToDate.diff(momentFromDate, "days") + 1;
  const totalamount = room ? room.rentperday * totaldays : 0;

  useEffect(() => {
    if (!roomid || !fromdate || !todate) return;

    const fetchRoom = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/rooms/getroombyid", { roomid });
        if (!data) throw new Error("Room data not found!");
        setRoom(data);
      } catch (error) {
        console.error("❌ Error fetching room:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomid, fromdate, todate]);

  useEffect(() => {
    if (totalamount > 0) {
      axios
        .post("/api/bookings/create-payment-intent", { totalamount })
        .then(({ data }) => setClientSecret(data.clientSecret))
        .catch((err) => console.error("❌ Error creating payment intent:", err));
    }
  }, [totalamount]);

  return (
    <div className="booking-container">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <h4>Loading...</h4>
        </div>
      ) : error ? (
        <Alert variant="danger">Error fetching room data.</Alert>
      ) : (
        <div className="booking-box">
          <div className="booking-left">
            <h2>{room.name}</h2>
            <img src={room.imageurls[0]} alt="Room" className="booking-img" />
          </div>

          <div className="booking-right">
            <h3>Booking Details</h3>
            <p><strong>From:</strong> {fromdate}</p>
            <p><strong>To:</strong> {todate}</p>
            <p><strong>Max Count:</strong> {room.maxcount}</p>
            <p><strong>Rent Per Day:</strong> ₹{room.rentperday}</p>
            <p><strong>Total Days:</strong> {totaldays}</p>
            <p><strong>Total Amount:</strong> ₹{totalamount}</p>

            {clientSecret && (
              <>
                <Button onClick={() => setShowModal(true)} className="btn btn-primary">
                  Pay ₹{totalamount}
                </Button>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Enter Payment Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <PaymentForm {...{ totalamount, totaldays, room, fromdate, todate, navigate, clientSecret, setShowModal }} />
                    </Elements>
                  </Modal.Body>
                </Modal>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentForm({ totalamount, totaldays, room, fromdate, todate, navigate, clientSecret, setShowModal }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) throw new Error(error.message);

      await axios.post("/api/bookings/bookroom", {
        room,
        userid: JSON.parse(localStorage.getItem("currentUser"))._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        transactionId: paymentIntent.id,
      });

      setShowModal(false);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button type="submit" disabled={!stripe || loading} className="btn btn-primary mt-3">
        {loading ? "Processing..." : `Pay ₹${totalamount}`}
      </Button>
      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
    </form>
  );
}

export default Bookingscrren;