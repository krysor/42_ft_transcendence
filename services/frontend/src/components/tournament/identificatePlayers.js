import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const IdentificatePlayers = () => {
  const { numberOfPlayers } = useParams();
  const [players, setPlayers] = useState(Array.from({ length: numberOfPlayers }, () => ''));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const handlePlayerChange = (index, event) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = event.target.value;
    setPlayers(updatedPlayers);
  };

  const handleFormSubmit = (index, event) => {
    event.preventDefault();
    // Move to the next player
    if (index < numberOfPlayers - 1) {
      setCurrentPlayerIndex(index + 1);
    }
    // Handle form submission (e.g., send data to backend)
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {players.map((player, index) => (
        // Only render the input field for the current player
        index === currentPlayerIndex && (
          <div key={index}>
            <input
              value={player}
              onChange={(event) => handlePlayerChange(index, event)}
              placeholder={`Player ${index + 1} Username`}
            />
            <br />
          </div>
        )
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default IdentificatePlayers;
