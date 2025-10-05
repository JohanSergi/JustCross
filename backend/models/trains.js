import mongoose from "mongoose";

const trainsSchema = new mongoose.Schema({
  "Train Number": Number,
  "Train Name": String,
  "From": String,
  "To": String,
  "Departure": Number,
  "Arrival": Number,
}, { collection: "Trains" }); 

export default mongoose.model("Trains", trainsSchema);
