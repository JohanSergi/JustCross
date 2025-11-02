import mongoose from 'mongoose';
import Trains from '../models/trainsModel.js';

const train_no = new Set()

const getTrains = async (req, res) => {
  try{
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const fourHoursLater = nowMinutes + 420;

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = daysOfWeek[now.getDay()];
    console.log(`📅 Today is: ${today}`);

    const trains = await Trains.find({
      "Arrival_minutes": { "$gte": nowMinutes, "$lte": fourHoursLater },
      [today]: 1
    });

    

    trains.forEach(train => {
      train_no.add(train["Train Number"])
    })
    console.log("trains nos: ",train_no)
    // for (const value of train_no) {
    //   getApi(value);
    // }



    const firstValue = [...train_no][0] || 16343;
    const apiData = await getApi(firstValue);
    const eta = getETA(apiData);
    const etc = subtract30Minutes(eta)
    res.json(etc);
  }
  catch (error) {
    res.status(500).json({error: "server error: couldn't get trains from database"})
    console.log(error)
  }
};

const getApi = async (trainNo) =>{
    const today = new Date();
    const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

    const response = await fetch(
      `${process.env.API_URL}?departure_date=${formattedDate}&isH5=true&client=web&train_number=${trainNo}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": "bb1ccdd0ecmshd58af927c0f05abp10567cjsn12c9ea2dc274", 
          "x-rapidapi-host": "indian-railway-irctc.p.rapidapi.com",
        },
      }
    );

    const result = await response.json();

    console.log(result)
    return result;
  }
  
  const getETA = (data) => {
    const targetStation = "QLN";
    if (!data || !data.body || !Array.isArray(data.body.stations)) {
      return null;
    }
    const station = data.body.stations.find(stn => stn.stationCode === targetStation);

    if (station) {
      console.log("Arrival Time:", station.actual_arrival_time);
      return(station.actual_arrival_time)
    } else {
      console.log("Station not found!");
    }

  }

function subtract30Minutes(timeStr) {
  if (!timeStr || !timeStr.includes(":")) return "--:--";

  const [hours, minutes] = timeStr.split(":").map(Number);
  const total = (hours * 60 + minutes - 30 + 1440) % 1440;
  const newHours = String(Math.floor(total / 60)).padStart(2, "0");
  const newMinutes = String(total % 60).padStart(2, "0");

  return `${newHours}:${newMinutes}`;
}

  
export { getTrains };
