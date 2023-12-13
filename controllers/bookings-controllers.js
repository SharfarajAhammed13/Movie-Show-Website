import mongoose, { mongo } from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
export const newBooking = async (req, res, next) => {
    const { movie, date, seatnumber,user } = req.body;
    let existingMovie;
    let existingUser;
    try{
        existingMovie = await Movie.findById(movie);
        existingUser= await User.findById(user);
    } catch (err) {
        return console.log(err);
    }

    if (!existingMovie) {
        return res.status(404).json({ message:"Movie not found with gievn ID"});
    }
    if (!existingUser) {
        return res.status(404).json({message: "User Not found with given ID"});
    }



    let newBooking;

    try {
        newBooking = new Bookings({
            movie, date: new Date(`${date}`), seatnumber, user,
        });

        const session = mongoose.startSession();
        session.startTransaction();
        existingUser.newBooking.push(Bookings);
        existingMovie.newBooking.push(Bookings);

        await existingUser.save({session});
        await existingMovie.save({session});
        await newBooking.save({ session });
        session.commitTransaction();

        // newBooking = await newBooking.save();
    } catch (err) {
        return console.log(err);
    }
    if(!newBooking) {
        return res.status(500).json({ message: "Unable to create a booking"});
    }
    return res.status(201).json({ booking: newBooking});
};

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findById(id)
    } catch (err) {
        return console.log(err)
    } 

    if(!booking) {
        return res.status(500).json({ message: "Unexpected Erro"});
    }
    return res.status(200).json({ booking });
};

export const deleteBooking = async () => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndDelete(id).populate("user movie");

        const session = await mongoose.startSession();

        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({ session });
        session.commitTransaction(); // something to add later u check in 2:50:21 mins in part one

    } catch (err) {
        return console.log(err);
    }

    if (!booking) {
        return res.status(500).json({ message: "Unable to delete"});
    }

    return res.status(200).json({ message:" Succefully Deleted"});
};

export const getBookingOfUser = async (req, res, next) => {
    const id= req.params.id;
    let booking;
    try {
        booking = await Bookings.find({ user: id });
    } catch (err) {
        console.log(err);
    }

    if (!booking) {
        return res.status(500).json({message:"Unable to get Booking"})
    }

    return res.status(200).json({bookings});
};