import React from 'react'
import { useGate } from '../context/GateContext'

function GateButton(props) {
  const { selectedGate, setSelectedGate } = useGate();

  const isSelected = selectedGate === props.name;

  const handleClick = () => {
    setSelectedGate(props.name);
  };

  return (
    <div>
        <button
          className={`${props.className || ''} ${isSelected ? 'selected' : ''}`.trim()}
          onClick={handleClick}
          aria-pressed={isSelected}
        >
            <label>{props.name}</label>
        </button>
    </div>
  )
}

export default GateButton