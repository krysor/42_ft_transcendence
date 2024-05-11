import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerSelection = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const navigate = useNavigate();

  const handleNumberOfPlayersChange = (event) => {
    setNumberOfPlayers(parseInt(event.target.value));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate(`/tournament/register/${numberOfPlayers}`);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="numberOfPlayers">Number of players :</label>
      <select
        id="numberOfPlayers"
        value={numberOfPlayers}
        onChange={handleNumberOfPlayersChange}
        >
        <option value={2}>2 players</option>
        <option value={3}>3 players</option>
        <option value={4}>4 players</option>
        <option value={5}>5 players</option>
        <option value={6}>6 players</option>
        <option value={7}>7 players</option>
        <option value={8}>8 players</option>
      </select>
      <button type="submit">Proceed to Registration</button>
    </form>
  );
};

export default PlayerSelection;

