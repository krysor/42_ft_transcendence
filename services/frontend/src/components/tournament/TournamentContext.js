import React, { createContext, useContext, useState } from 'react';

const TournamentContext = createContext();

export const useTournament = () => {
  return useContext(TournamentContext);
};

export const TournamentProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  const addPlayer = (player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const isPlayerInTournament = (playerId) => {
    console.log("isPlayerInTournament " + playerId);
    return players.some(player => player.id !== '0' && player.id === playerId);
  };

  return (
    <TournamentContext.Provider value={{ players, setPlayers, addPlayer, isPlayerInTournament }}>
      {children}
    </TournamentContext.Provider>
  );
};
