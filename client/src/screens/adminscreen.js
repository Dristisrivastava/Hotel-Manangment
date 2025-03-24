import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div className="mt-3 ml-3 mr-3 ps">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>

        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>

        <TabPane tab="Add Room" key="3">
          <Addroom/>
        </TabPane>

        <TabPane tab="Users" key="4">
          <Users/>
        </TabPane>
      </Tabs>
    </div>
  );
}

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("/api/bookings/getallbookings");
        setBookings(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>

        {error && <p className="text-danger">Error: {error}</p>}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Bookings Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get("/api/rooms/getallrooms");
        setRooms(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>

        {error && <p className="text-danger">Error: {error}</p>}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Rooms Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/users/getallusers");
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>

        {error && <p className="text-danger">Error: {error}</p>}

        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Addroom() {

    const[name,setname]=useState('')
    const[rentperday,setrentperday]=useState('')
    const[maxcount,setmaxcount]=useState('')
    const[description,setdescription]=useState('')
    const[phonenumber,setphonenumber]=useState('')
    const[type,settype]=useState('')
    const[imageurl1,setimageurl1]=useState('')
    const[imageurl2,setimageurl2]=useState('')

    async function addroom() {
        const newroom = {
            name,
            rentperday: Number(rentperday),  // Ensure it's a number
            maxcount: Number(maxcount),      // Ensure it's a number
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2].filter(url => url.trim() !== ""), // Remove empty URLs
        };
    
        console.log("Sending data:", newroom); // Log the request before sending
    
        try {
            const response = await axios.post("/api/rooms/addroom", newroom);
            alert("Room added successfully!");
            console.log("Response:", response.data);
    
            // 🔄 Reset the input fields after successful submission
            setname('');
            setrentperday('');
            setmaxcount('');
            setdescription('');
            setphonenumber('');
            settype('');
            setimageurl1('');
            setimageurl2('');
        } catch (error) {
            console.error("Error adding room:", error.response ? error.response.data : error.message);
            alert("Failed to add room. Check console for details.");
        }
    }
    
    
    return (
    
    <div className='row'>
    
    <div className="col-md-5">
    
    <input type="text" className="form-control" placeholder='room name'
    value={name} onChange={(e)=>{setname(e.target.value)}}
    />
    <input type="text" className="form-control" placeholder='Rent per day'
    value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}
    />
    <input type="text" className="form-control" placeholder='Max count'
    value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}
    />
    <input type="text" className="form-control" placeholder='Description'
    value={description} onChange={(e)=>{setdescription(e.target.value)}}
    />
    <input type="text" className="form-control" placeholder='Phone number'
    value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}
    />
    </div>
    
    <div className="col-md-5">
    <input type="text" className="form-control" placeholder='type'
    value={type} onChange={(e)=>{settype(e.target.value)}}
    />
    <input type="text" className="form-control" placeholder='img url 1'
    value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}
    />
    <input type="text" className="form-control" placeholder='img url 2'
    value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}
    />
    <div className="text-right">

   <button className='btn btn-secondary mt-2' onClick={addroom}>Add Room</button>

</div>
    </div>
    
    </div>
    );
}
export default Adminscreen;
