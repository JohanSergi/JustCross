import mongoose from 'mongoose';
import Trains from '../models/trainsModel.js';

const train_no = new Set()

const getTrains = async (req, res) => {
  try{
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const oneHourLater = nowMinutes + 60;

    const trains = await Trains.find({
    "Arrival_minutes": { "$gte": nowMinutes, "$lte": oneHourLater }
    });


    trains.forEach(train => {
      train_no.add(train["Train Number"])
    })
    console.log("trains nos: ",train_no)
    getStatus();
    res.json(trains);
  }
  catch (error) {
    res.status(500).json({error: "server error: couldn't get trains from database"})
    console.log(error)
  }
};

const getStatus = async () => {
  
    const date = 20251007

    const getApi = async (trainNo) =>{
      const response = await fetch(
       `${process.env.API_URL}?departure_date=${date}&isH5=true&client=web&train_number=${trainNo}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "d3e1813a75msh38daf7b6795df1cp1a847djsnc7b0f1ea4f19", 
            "x-rapidapi-host": "indian-railway-irctc.p.rapidapi.com",
          },
        }
      );

      const result = await response.json();

      console.log(result)
    }
    getApi(16792)
}

export { getTrains };