import React, { useEffect } from 'react'
import { useGate } from '../context/GateContext'

function Details() {
  const { selectedGate } = useGate();
  useEffect(() => {
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
      }catch(err){
        console.error('Failed to fetch trains:', err)
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