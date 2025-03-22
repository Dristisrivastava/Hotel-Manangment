import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import moment from "moment";
import { DatePicker, Spin } from "antd";

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromdate, setFromDate] = useState(null);
  const [todate, setToDate] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");
  const [duplicateRooms, setDuplicateRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/rooms/getallrooms");
      setRooms(data);
      setFilteredRooms(data);
      setDuplicateRooms(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setLoading(false);
    }
  }

  function filterRooms() {
    let tempRooms = duplicateRooms;

    if (searchKey) {
      tempRooms = tempRooms.filter((room) =>
        room.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (type !== "all") {
      tempRooms = tempRooms.filter(
        (room) => room.type.toLowerCase() === type.toLowerCase()
      );
    }

    setFilteredRooms(tempRooms);
  }

  useEffect(() => {
    filterRooms();
  }, [searchKey, type]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center bs">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <RangePicker
              format="DD-MM-YYYY"
              onChange={(dates) => {
                if (dates && dates.length === 2) {
                  setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
                  setToDate(moment(dates[1]).format("DD-MM-YYYY"));
                } else {
                  setFromDate(null);
                  setToDate(null);
                }
              }}
              className="p-2 flex-grow-1"
            />

            <input
              type="text"
              className="form-control search-box"
              placeholder="Search room"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />

            <select
              className="form-control filter-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {loading ? (
          <div className="text-center w-100">
            <Spin size="large" />
          </div>
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div className="col-md-6 mt-3" key={room._id}>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        ) : (
          <h3 className="text-center text-danger w-100">No available rooms found</h3>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
