import React, { useState } from 'react';
import { useUsers } from './UserContext';
import ProfilePic from '../user/getProfilePic';
import Game from '../game/game'; // Import the Game component

const Participants = () => {
  const { users, setUsers } = useUsers();
  const [participants, setParticipants] = useState(users);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [currentPair, setCurrentPair] = useState(0);

  const doTournament = (event) => {
    event.preventDefault();

    if (participants.length < 2) {
      alert('Tournament is over!');
      return;
    }

    let player1;
    let player2;
  
    if (!participants[currentPair]) {
      setCurrentPair(0);
      player1 = participants[0];
    }
    else {
      player1 = participants[currentPair];
    }

    if (!participants[currentPair + 1]) {
      setCurrentPair(0);
      player2 = participants[1];
    }
    else {
      player2 = participants[currentPair + 1];
    }

    setCurrentPair(currentPair + 1);
    setCurrentMatch({ player1, player2 });
  };

  const handleGameEnd = (loser) => {
    const updatedParticipants = participants.filter(participant => participant !== loser);
    setParticipants(updatedParticipants);
    setUsers(updatedParticipants);

    setCurrentMatch(null);
  };

  return (
    <div>
      {currentMatch && (
        <>
           <p>Player 1: {currentMatch.player1.username}</p>
          <p>Player 2: {currentMatch.player2.username}</p>
          <button onClick={() => handleGameEnd(currentMatch.player2)}>End Game (Player 1 Wins)</button>
          <button onClick={() => handleGameEnd(currentMatch.player1)}>End Game (Player 2 Wins)</button>
        </>
        // <Game 
        // player1={currentMatch.player1} 
        // player2={currentMatch.player2} 
        // onGameEnd={handleGameEnd} 
        // />
      )}

      {!currentMatch && participants.length != 1 && (
        <>
        <h2>Tournament Participants:</h2>
        <ul>
          {participants.map((user, index) => (
            <li key={index}>
              Username: {user.username}, Profile Picture: {user.profile}
              <ProfilePic filename={user.profile} online={user.is_online} />
            </li>
          ))}
        </ul>
        <button onClick={doTournament}>PLAY !</button>
        </>
      )}

      {participants.length === 1 && (
        <div>
          <h3>The winner is: {participants[0].username}</h3>
        </div>
      )}
    </div>
  );
};

export default Participants;
