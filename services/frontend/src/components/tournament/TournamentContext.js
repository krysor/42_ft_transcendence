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

  return (
    <TournamentContext.Provider value={{ players, setPlayers, addPlayer }}>
      {children}
    </TournamentContext.Provider>
  );
};
