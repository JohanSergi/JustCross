import React, { useEffect, useState } from 'react'
import { useGate } from '../context/GateContext'

function Details() {
  const { selectedGate } = useGate();
  const [eta,setEta] = useState("");
    
  const fetchTrains = async () => {
      try{
        const response = await fetch('/trains',{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
        if(!response.ok){
          throw new Error(`Request failed: ${response.status}`)
        }
        const data = await response.json()
        console.log("response recieved")
        console.log(data)
        setEta(data)
      }catch(err){
        console.error('Failed to fetch trains:', err)
      }
  }
  return (
    <div className='details'>
        <div className='GateSelected'>
            {selectedGate ? (
              <span>Selected Gate: <strong>{selectedGate}</strong></span>
            ) : (
              <span>No gate selected</span>
            )}
        </div>
        <div className='GateStatus'>
          <span>Gate Status: <strong>{selectedGate ? "Open" : "Closed"}</strong></span>

        </div>
        <div>
            <div className='ET'>
              <h1>Estimated time of closing:{eta}</h1>
            </div>
            <div className='ET'>

            </div>
        </div>
        <div className='Map'>

        </div>
        <button onClick={fetchTrains}>get details </button>
    </div>
  )
}

export default Details