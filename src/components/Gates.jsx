import React from 'react'
import GateButton from './GateButton'

function Gates() {
  const gates = [
    "kallumthazham",
    "college jn",
    "beach road",
    "Chathinamkulam"
  ]
  return (
    <div className="gates-container">
      {gates.map((gate, key) => (
        <GateButton key={key} name={gate} className="gate-button" />
      ))}
    </div>
  )
}

export default Gates
