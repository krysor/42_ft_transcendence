import React, { useState, useEffect } from 'react';
import { useUsers } from './UserContext';
import { useLocation, NavLink, useNavigate, usePrompt } from 'react-router-dom';
import ProfilePic from '../user/ProfilePic';
import ThreejsGame from '../game/threejs';
import Morpion from '../morpion/morpion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next'
const backendHost = 'http://' + window.location.hostname + ':8000';

const Matchmaking = () => {
  const { t } = useTranslation()
  const { users, setUsers } = useUsers();
  const [participants, setParticipants] = useState(users);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [currentPair, setCurrentPair] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const game = location.state?.game;

  sessionStorage.removeItem("players");
  sessionStorage.removeItem("currentPlayer");
  sessionStorage.removeItem("game");

  const sortParticipantsByLevel = (participants) => {
    return participants.sort((a, b) => (b.win - b.loss) - (a.win - a.loss));
  };

  useEffect(() => {
    setParticipants(sortParticipantsByLevel(participants));
  }, [participants]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'You are in the middle of a tournament, are you sure you want to leave?';
    };

    const handleNavLinkClick = (event) => {
      const confirmationMessage = 'You are in the middle of a tournament, are you sure you want to leave?';
      if (!window.confirm(confirmationMessage)) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.querySelectorAll('a').forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, [location, navigate]);

  const doTournament = (event) => {
    event.preventDefault();

    if (participants.length < 2) {
      alert('Tournament is over!');
      return;
    }

    let i = currentPair;
    let player1;
    let player2;

    if (!participants[i]) {
      i = 0;
      player1 = participants[i];
    } else {
      player1 = participants[i];
    }

    if (!participants[i + 1]) {
      i = 0;
      player2 = participants[i];
    } else {
      player2 = participants[i + 1];
    }

    setCurrentPair(i + 1);
    setCurrentMatch({ player1, player2 });
    setIsReady(false);
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

  const handleReadyClick = () => {
    setIsReady(true);
  };

  return (
    <div className="container mt-5">
      {!currentMatch && participants.length !== 1 && (
        <>
          <h2 className="mb-4">{t('Tournament participants')}:</h2>
          <ul className="list-group">
            {participants.map((user, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <ProfilePic filename={user.profile} online={user.is_online} className="mr-3" />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
          <button onClick={doTournament} className="btn btn-primary mt-4">{t('PLAY')} !</button>
        </>
      )}

      {currentMatch && !isReady && (
        <>
          <p>{t('Next match')}:</p>
          <p>{currentMatch.player1.username} VS {currentMatch.player2.username}</p>
          <button onClick={handleReadyClick} className="btn btn-primary">{t('Ready')}</button>
        </>
      )}

      {currentMatch && isReady && (
        <>
          <h1>outside: game: {game}</h1>
          
          {currentMatch && game === 'Pong' && (
            <ThreejsGame
              p1={currentMatch.player1}
              p2={currentMatch.player2}
              onGameEnd={handleGameEnd}
            />
          )}

          {currentMatch && game === 'morpion' && (
            <>
              <p>{t('Player')} 1: {currentMatch.player1.username}</p>
              <p>{t('Player')} 2: {currentMatch.player2.username}</p>
              <button onClick={() => handleGameEnd(currentMatch.player1, 10, currentMatch.player2, 0)} className="btn btn-success">End Game (Player 1 Wins)</button>
              <button onClick={() => handleGameEnd(currentMatch.player1, 0, currentMatch.player2, 10)} className="btn btn-danger">End Game (Player 2 Wins)</button>
            </>
          )}
        </>
      )}

      {participants.length === 1 && (
        <div className="mt-4">
          <h3>{t('Congratulations')} {participants[0].username} !!! {t('You are the winner')} :)</h3>
          <img src='/win_image.jpg' alt="Winner"/>
          <br />
          <NavLink to="/tournament" className="btn btn-primary mt-4">{t('New tournament')}</NavLink>
        </div>
      )}
    </div>
  );
};

export default Matchmaking;
