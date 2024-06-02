import React, { useState } from 'react';
import { useUsers } from './UserContext';
import { useLocation } from 'react-router';
import { NavLink, Link } from "react-router-dom";
import ProfilePic from '../user/ProfilePic';
import Game from '../game/game'; // Import the Game component
import ThreejsGame from '../game/threejs';
import Morpion from '../morpion/morpion';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendHost = 'http://' + window.location.hostname + ':8000';

const Matchmaking = () => {
  const { users, setUsers } = useUsers();
  const [participants, setParticipants] = useState(users);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [currentPair, setCurrentPair] = useState(0);

  const location = useLocation();
  const game = location.state?.game;

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
    } else {
      player1 = participants[currentPair];
    }

    if (!participants[currentPair + 1]) {
      setCurrentPair(0);
      player2 = participants[1];
    } else {
      player2 = participants[currentPair + 1];
    }

    setCurrentPair(currentPair + 1);
    setCurrentMatch({ player1, player2 });
  };

  const fetchMatchResult = (player1, p1Result, player2, p2Result) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const is_pong = game === 'pong';

    const jsonData = {
      p1ID: player1.id,
      p1Result: p1Result,
      p2ID: player2.id,
      p2Result: p2Result,
      date: formattedDate,
      is_pong: is_pong,
    };
    console.log("data match: ");
    console.log(jsonData);
    fetch(backendHost + '/tournament/add_match_to_historic/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    })
      .then(response => {
        if (!response.ok) {
          throw response.error;
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  const handleGameEnd = (player1, p1Result, player2, p2Result) => {
    let loser;
    if (p1Result < p2Result) {
      loser = player1;
    } else {
      loser = player2;
    }

    const updatedParticipants = participants.filter(participant => participant !== loser);
    setParticipants(updatedParticipants);
    setUsers(updatedParticipants);

    fetchMatchResult(player1, p1Result, player2, p2Result);

    setCurrentMatch(null);
  };

  return (
    <div className="container mt-5">
      {currentMatch && game === 'pong' && (
        <ThreejsGame
          p1={currentMatch.player1}
          p2={currentMatch.player2}
          onGameEnd={handleGameEnd}
        />
      )}

      {currentMatch && game === 'morpion' && (
        // <Morpion 
        // p1={currentMatch.player1} 
        // p2={currentMatch.player2} 
        // onGameEnd={handleGameEnd} 
        // />

        <>
          <p>Player 1: {currentMatch.player1.username}</p>
          <p>Player 2: {currentMatch.player2.username}</p>
          <button onClick={() => handleGameEnd(currentMatch.player1, 10, currentMatch.player2, 0)} className="btn btn-success">End Game (Player 1 Wins)</button>
          <button onClick={() => handleGameEnd(currentMatch.player1, 0, currentMatch.player2, 10)} className="btn btn-danger">End Game (Player 2 Wins)</button>
        </>
      )}

      {!currentMatch && participants.length !== 1 && (
        <>
          <h2 className="mb-4">Tournament Participants:</h2>
          <ul className="list-group">
            {participants.map((user, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <ProfilePic filename={user.profile} online={user.is_online} className="mr-3" />
                <span>Username: {user.username}</span>
              </li>
            ))}
          </ul>
          <button onClick={doTournament} className="btn btn-primary mt-4">PLAY !</button>
        </>
      )}

      {participants.length === 1 && (
        <div className="mt-4">
          <h3>Congratulations {participants[0].username} !!! You are the winner :)</h3>
          <img src='/win_image.jpg'/>
          <br />
          <NavLink to="/tournament" className="btn btn-primary mt-4">New tournament</NavLink>
        </div>
      )}
    </div>
  );
};

export default Matchmaking;
