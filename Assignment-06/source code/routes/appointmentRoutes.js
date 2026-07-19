const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// CREATE Appointment (WITH SLOT CHECK)
router.post("/", async (req, res) => {
    try {
        console.log("POST Body:", req.body);

        const { name, email, phone, caName, date, time, purpose } = req.body;

        //Check if same CA + date + time already exists
        const existing = await Appointment.findOne({
            caName: caName,
            date: date,
            time: time
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Slot already booked for this CA"
            });
        }

        // Save new appointment
        const appointment = new Appointment({
            name,
            email,
            phone,
            caName,
            date,
            time,
            purpose
        });

        await appointment.save();

        res.status(200).json({
            success: true,
            message: "Appointment booked successfully"
        });

    } catch (error) {
        console.log("POST ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// GET All Appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        console.log("GET ERROR:", error);
        res.status(500).json([]);
    }
});

// DELETE Appointment
router.delete("/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log("DELETE ERROR:", error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;