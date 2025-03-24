const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rentperday: { type: Number, required: true },
    maxcount: { type: Number, required: true },
    description: { type: String, required: true },
    phonenumber: { type: String, required: true },
    type: { type: String, required: true },
    imageurls: { type: [String], required: true }
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
