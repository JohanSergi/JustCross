import mongoose from "mongoose";

const crossSchema = new mongoose.Schema({
    "Name" : String,
    "Railway_Stations" : Array,
}, { collection: "LevelCross" }); 

export default mongoose.model("LevelCross", crossSchema);
