import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerSelection = () => {
  const navigate = useNavigate();
  const [tournamentUsers, setTournamentUsers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerNames, setPlayerNames] = useState([]);
 
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const nbOfPlayers = parseInt(event.target.nbOfPlayers.value, 10);
    setPlayerNames(Array.from({ length: nbOfPlayers }, () => ''));
    setCurrentPlayer(1);
  };

  const handlePlayerNameSubmit = (event) => {
    event.preventDefault();
    const playerName = event.target.playerName.value;

    setPlayerNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[currentPlayer - 1] = playerName;
      return updatedNames;
    });

    setCurrentPlayer((prevPlayer) => prevPlayer + 1);
  };

  // Fonction pour vérifier si tous les noms ont été saisis
  const allNamesEntered = () => {
    return playerNames.every(name => name !== '');
  };

  if (currentPlayer > playerNames.length && allNamesEntered()) {
    // Redirection une fois que tous les noms ont été saisis
    console.log(playerNames)
    navigate(`/tournament/register`);
  }

  return (
    <>
      {currentPlayer <= playerNames.length && (
        <form onSubmit={handlePlayerNameSubmit}>
          <label htmlFor="playerName">Player {currentPlayer} choose your pseudo:</label>
          <input type="text" name="playerName" id="playerName" />
          <button type="submit">Submit</button>
        </form>
      )}

      {currentPlayer > playerNames.length && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="nbOfPlayers">How many players will play in the tournament?</label>
          <input type="number" name="nbOfPlayers" id="nbOfPlayers" min="1" max="16" />
          <button type="submit">Proceed to Registration</button>
        </form>
      )}
    </>
  );
};

export default PlayerSelection;
