import mongoose from "mongoose";

const trainsSchema = new mongoose.Schema({
  "Train Number": Number,
  "Train Name": String,
  "From": String,
  "To": String,
  "Departure_minutes": Number,
  "Arrival_minutes": Number,
}, { collection: "Trains" }); 

export default mongoose.model("Trains", trainsSchema);
