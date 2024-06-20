import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useUsers } from './UserContext';
import { useTournament } from './TournamentContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next'
const backendHost = 'http://' + window.location.hostname + ':8000';

const Tournament = () => {
  const { t } = useTranslation()
  const { setUsers } = useUsers();
  const { players, setPlayers, addPlayer } = useTournament();
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState(() => Number(sessionStorage.getItem('currentPlayer')) || 1);
  const [error, setError] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [game, setGame] = useState(() => sessionStorage.getItem('game') || '');
  const location = useLocation();
  let vsAI = false;

  useEffect(() => {
    const storedPlayers = JSON.parse(sessionStorage.getItem('players'));
    if (storedPlayers) {
      setPlayers(storedPlayers);
    }
  }, [setPlayers]);

  useEffect(() => {
      sessionStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    sessionStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
  }, [currentPlayer]);

  useEffect(() => {
    sessionStorage.setItem('game', game);
  }, [game]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch(backendHost + '/tournament/ft_login/?code=' + code, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            if (!isRegisteredUser(data.user.id, players)) {
              const storedPlayers = JSON.parse(sessionStorage.getItem('players'));
              const updatedPlayers = [...storedPlayers];
              updatedPlayers[currentPlayer - 1] = { username: data.user.username, profile: data.user.profile_pic, id: data.user.id, win: data.user.win, loss: data.user.loss };
              setPlayers(updatedPlayers);
              setCurrentPlayer(prev => Number(prev) + 1);
            } else {
              setError('This user is already registered to this tournament.');
            }
          }
        })
        .catch(error => {
          setError('Error: ' + error);
          console.error('Error:', error);
        });
    }
  }, [addPlayer, location.search, players]);

  const isRegisteredUser = (userID, players) => {
    return players.some(player => player.id !== '0' && player.id === userID);
  };

  const getLoggedInUser = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user ? { username: user.username, profile: user.profile_pic, id: user.id } : null;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const nbOfPlayers = parseInt(event.target.nbOfPlayers.value, 10);
    const loggedInUser = getLoggedInUser();
    const initialPlayers = loggedInUser ? [{ ...loggedInUser }, ...Array.from({ length: nbOfPlayers - 1 }, () => ({ username: '', profile: '/default_pp.jpeg', id: '0', win: '0', loss: '0' }))] : Array.from({ length: nbOfPlayers }, () => ({ username: '', profile: '/default_pp.jpeg', id: '0', win: '0', loss: '0' }));
    setPlayers(initialPlayers);
    setCurrentPlayer(loggedInUser ? 2 : 1);
    setGame(event.target.gameSelect.value);
  };

  const handlePlayerNameSubmit = (event) => {
    event.preventDefault();
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer - 1] = { username: playerName, profile: '/default_pp.jpeg', id: '0', win: '0', loss:'0' };
    setPlayers(updatedPlayers);
    setCurrentPlayer(prev => Number(prev) + 1);
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
            updatedPlayers[currentPlayer - 1] = { username: data.user.username, profile: data.user.profile_pic, id: data.user.id, win: data.user.win, loss: data.user.loss};
            setPlayers(updatedPlayers);
            setCurrentPlayer(prev => Number(prev) + 1);
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

  useEffect(() => {
    if (currentPlayer > players.length && players.length) {
      setUsers(players);
      setPlayers([]);
      navigate(`/tournament/Matchmaking`, { state: { game } });
    }
  }, [players, currentPlayer, setUsers, game, navigate]);

  return (
    <div className="container mt-5">
      {currentPlayer <= players.length && (
        <form onSubmit={handlePlayerNameSubmit} className="mb-3">
          <div className="form-group">
            <label htmlFor="playerName">{t('Player')} {currentPlayer} {t('choose your pseudo')}:</label>
            <input 
              type="text" 
              name="playerName" 
              id="playerName" 
              value={playerName} 
              onChange={(e) => setPlayerName(e.target.value)} 
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">{t('Register')}</button>
        </form>
      )}
      <br />
      {currentPlayer <= players.length && (
        <>
          <p className="text-center">-----{t('or')}-----</p>
          <form onSubmit={handleLoginSubmit} className="mb-3">
            <div className="form-group">
              <label htmlFor="username">{t('Enter your username')}: </label>
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
              <label htmlFor="password">{t('Enter your password')}: </label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">{t('Login')}</button>
            <br />
            <p className="text-center">-----{t('or')}-----</p>
            <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftournament%2F&response_type=code">
              {t('Login with 42 authentication')}
            </a>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </form>
        </>
      )}

      {currentPlayer > players.length && (
        <>
        <form onSubmit={handleFormSubmit}>
          <h3>{t('Tournament')}</h3>

          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary active">
              <input type="radio" name="gameSelect" id="gamePong" value="Pong" autoComplete="off" defaultChecked /> Pong
            </label>
            <label className="btn btn-secondary">
              <input type="radio" name="gameSelect" id="gameMorpion" value="morpion" autoComplete="off" /> Morpion
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="nbOfPlayers">{t('How many players will play in the tournament ?')}</label>
            <input type="number" name="nbOfPlayers" id="nbOfPlayers" min="2" max="16" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">{t('Proceed to Registration')}</button>
        </form>
        <br />
        <h3>{t('Play against the bot')}</h3>
          <NavLink to="/Pong" className="btn btn-secondary">Pong</NavLink>
          <NavLink to="/morpion" className="btn btn-secondary">Morpion</NavLink>
      </>
      )}
    </div>
  );
};

export default Tournament;
