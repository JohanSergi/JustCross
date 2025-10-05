import mongoose from 'mongoose';
import Trains from '../models/trains.js';

const getTrains = async (req, res) => {
  try{
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const oneHourLater = nowMinutes + 60;

    const trains = await Trains.find({
    Arrival: { $gte: nowMinutes, $lte: oneHourLater }
    });

    console.log("time: ",nowMinutes,"trains: ",trains)
    res.json(trains);
  }
  catch (error) {
    res.status(500).json({error: "server error: couldn't get trains from database"})
    console.log(error)
  }
};

export { getTrains };