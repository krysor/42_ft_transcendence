import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendHost = 'http://' + window.location.hostname + ':8000';

const Tournament = () => {
  const { setUsers } = useUsers();
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');

  const [playerName, setPlayerName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [game, setGame] = useState('');

  const isRegisteredUser = (userID, players) => {
    for (let player of players) {
      if (player.id !== '0' && player.id === userID) {
        return true;
      }
    }
    return false;
  };

  // ------ function to handle forms ------
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const nbOfPlayers = parseInt(event.target.nbOfPlayers.value, 10);
    setPlayers(Array.from({ length: nbOfPlayers }, () => ({ username: '', profile: '/default_pp.jpeg', id: '0' })));
    setCurrentPlayer(1);
    setGame(event.target.gameSelect.value);
  };

  const handlePlayerNameSubmit = (event) => {
    event.preventDefault();
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer - 1] = { username: playerName, profile: '/default_pp.jpeg', id: '0' };
    setPlayers(updatedPlayers);
    setCurrentPlayer(currentPlayer + 1);
    setPlayerName('');
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    setError('');

    const jsonData = {
      username,
      password
    };

    fetch(backendHost + '/tournament/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          if (isRegisteredUser(data.user.id, players)) {
            setError('This user is already registered to this tournament.');
          } else {
            const updatedPlayers = [...players];
            updatedPlayers[currentPlayer - 1] = { username: data.user.username, profile: data.user.profile_pic, id: data.user.id };
            setPlayers(updatedPlayers);
            setCurrentPlayer(currentPlayer + 1);
            setUsername('');
            setPassword('');
          }
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError('An error occurred while processing your request.');
      });
  };

  // ----- use effect to check if every players are registered ------
  useEffect(() => {
    if (currentPlayer > players.length && players.length) {
      setUsers(players);
      navigate(`/tournament/Matchmaking`, { state: { game } });
    }
  }, [players]);

  return (
    <div className="container mt-5">
      {currentPlayer <= players.length && (
        <form onSubmit={handlePlayerNameSubmit} className="mb-3">
          <div className="form-group">
            <label htmlFor="playerName">Player {currentPlayer} choose your pseudo:</label>
            <input 
              type="text" 
              name="playerName" 
              id="playerName" 
              value={playerName} 
              onChange={(e) => setPlayerName(e.target.value)} 
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )}
      <br />
      {currentPlayer <= players.length && (
        <>
          <p className="text-center">-----or-----</p>
          <form onSubmit={handleLoginSubmit} className="mb-3">
            <div className="form-group">
              <label htmlFor="username">Enter username: </label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter your password: </label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Login!</button>
            <br />
            <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F42_auth%2F&response_type=code">
              Login with 42 authentication!
            </a>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </form>
        </>
      )}

      {currentPlayer > players.length && (
		  <form onSubmit={handleFormSubmit}>
			<h3>Tournament</h3>

			<div className="btn-group btn-group-toggle" data-toggle="buttons">
			<label className="btn btn-secondary active">
				<input type="radio" name="gameSelect" id="gamePong" value="Pong" autoComplete="off" defaultChecked /> Pong
			</label>
			<label className="btn btn-secondary">
				<input type="radio" name="gameSelect" id="gameMorpion" value="morpion" autoComplete="off" /> Morpion
			</label>
			</div>

          <div className="form-group">
            <label htmlFor="nbOfPlayers">How many players will play in the tournament?</label>
            <input type="number" name="nbOfPlayers" id="nbOfPlayers" min="1" max="16" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Proceed to Registration</button>
        </form>
      )}
    </div>
  );
};

export default Tournament;
