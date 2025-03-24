const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const stripe = require("stripe")("sk_test_51R45PyBMbwUDnFnLCO2L6HN1F8XPGSHA5ZC2mNfifJv35Lm9mUk73WQT7luKxuoaH30nHIvXhObolKHiLnKrEqBd00nC0xEAyI");

router.post("/create-payment-intent", async (req, res) => {
    const { totalamount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalamount * 100,
            currency: "inr",
            payment_method_types: ["card"],
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/bookroom", async (req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays, transactionId } = req.body;

    try {
        const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId,
        });

        const booking = await newBooking.save();

        const roomToUpdate = await Room.findOne({ _id: room._id });

        if (!roomToUpdate) return res.status(404).json({ error: "Room not found" });

        roomToUpdate.currentbookings.push({
            bookingid: booking._id,
            fromdate,
            todate,
            userid,
            status: "booked",
        });

        await roomToUpdate.save();

        res.send({ message: "Room booked successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/cancelbooking", async(req, res) => {

    const {bookingid, roomid} =req.body
    
    try {
    
    const bookingitem= await Booking.findOne({_id : bookingid})
    
    bookingitem.status ='cancelled'
    
    await bookingitem.save()
    
    const room =await Room.findOne({_id : roomid})
    
    const bookings =room.currentbookings
    
    const temp =bookings.filter(booking => booking.bookingid.toString()!=-bookingid)
    
    room.currentbookings = temp
    
    await room.save()
    res.send('Your booking cancelled successfully')

} catch (error) {

return res.status(400).json({ error});
}
});
router.get("/getallbookings", async(req, res) => {

    try {
    
    const bookings= await Booking.find()
    
    res.send(bookings)
    
    } catch (error) {
    
    return res.status(400).json({ error });
    
    }
    });
module.exports = router;
