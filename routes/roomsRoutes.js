const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Booking = require("../models/booking"); // Import the Booking model

// Get all rooms
router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

// Get room by ID
router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;
    try {
        const room = await Room.findOne({ _id: roomid });
        res.send(room);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

// Get bookings by user ID
router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid;

    try {
        const bookings = await Booking.find({ userid: userid }); // Use Booking model
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
