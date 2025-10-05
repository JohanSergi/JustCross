import React, { useEffect } from 'react'
import { useGate } from '../context/GateContext'

function Details() {
  const { selectedGate } = useGate();
  useEffect(() => {
    const fetchTrains = async () => {
      const response = await fetch('/trains',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
      const data = await response.json()
      if (response.ok){
        console.log("response recieved")
        console.log(data)
      }
    }
    fetchTrains()
  },[])
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

            </div>
            <div className='ET'>

            </div>
        </div>
        <div className='Map'>

        </div>
    </div>
  )
}

export default Details