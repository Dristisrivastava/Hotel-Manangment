const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Booking = require("../models/booking"); // Import the Booking model

// Get all rooms
router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error });
    }
});

// Get room by ID
router.post("/getroombyid", async (req, res) => {
    try {
        const { roomid } = req.body;
        const room = await Room.findById(roomid);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: "Error fetching room", error });
    }
});

// Get bookings by user ID
router.post("/getbookingsbyuserid", async (req, res) => {
    try {
        const { userid } = req.body;
        const bookings = await Booking.find({ userid });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
});

// ✅ Get rooms by city
router.get("/getroomsbycity", async (req, res) => {
    try {
        const { city } = req.query;
        
        if (!city) {
            return res.status(400).json({ message: "City is required" });
        }

        const rooms = await Room.find({ city: city });

        if (rooms.length === 0) {
            return res.status(404).json({ message: `No rooms found in ${city}` });
        }

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms by city", error });
    }
});
router.post("/addroom", async (req, res) => {
    try {
        const { name, rentperday, maxcount, description, phonenumber, type, imageurls } = req.body;

        // Validate required fields
        if (!name || !rentperday || !maxcount || !description || !phonenumber || !type || !imageurls) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Log request body for debugging
        console.log("Received data:", req.body);

        const newroom = new Room({
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls,
        });

        await newroom.save();
        res.status(201).json({ message: "New Room Added Successfully" });
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ message: "Error adding room", error });
    }
});


module.exports = router;
