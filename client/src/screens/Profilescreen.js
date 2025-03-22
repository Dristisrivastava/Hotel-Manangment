import React, { useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Swal from 'sweetalert2'

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h2
            style={{ textAlign: "left", fontWeight: "bold", fontSize: "20px" }}
          >
            My Profile
          </h2>
          <br />

          <h3
            style={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "18px",
            }}
          >
            Name : {user.name}
          </h3>
          <h1
            style={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "18px",
            }}
          >
            Email : {user.email}
          </h1>
          <h1
            style={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "18px",
            }}
          >
            IsAdmin : {user.isAdmin ? "YES" : "NO"}
          </h1>
        </TabPane>

        <TabPane tab="Bookings" key="2">
          <MyBooking />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBooking() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = React.useState([]);

  useEffect(() => {
    async function fetchBookings() {
      if (user) {
        try {
          const data = await (
            await axios.post("/api/bookings/getbookingsbyuserid/", {
              userid: user._id,
            })
          ).data;
          setBookings(data); 
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    }
    fetchBookings();
  }, [user]);
  async function cancelBooking(bookingid,roomid){
    try {
        const result=await(await axios.post("/api/cancelbooking",{bookingid,roomid})).data
        console.log(result)
        Swal.fire('congrats your booking is cancelled').then(result=>{
            window.location.reload()
        })
    } catch (error) {
        console.log(error)
        Swal.fire('Oops,Something went wrong','error')
    }
  }
  return (
    <div className="row">
      <div className="col-md-6">
        {bookings && (bookings.map(booking=>{
             return <div className="bs">
             <p>[booking.room]</p>
             <p><b>BookingId</b>: (booking._id)</p>
             <p><b>CheckIn</b> : (booking.fromdate)</p>
             <p><b>Check Out</b>: (booking.todate)</p>
             <p><b>Amount</b>: (booking.totalamount)</p>
             <p><b>Status</b>: (booking.status == 'booked' ? 'CONFIRMED': 'CANCELLED')</p>
             <div className="text-right">
                {booking.status !== 'cancelled' && (
                    <button className="btn btn-primary" onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOKING</button>
                )}
             </div>
           </div>
        }))}
      </div>
    </div>
  );
}
