import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTournament } from './TournamentContext';

const FtAuthTournament = () => {
  const [error, setError] = useState('');
  const { addPlayer } = useTournament();
  const navigate = useNavigate();

  const isRegisteredUser = (userID) => {
    console.log("isRegisteredUser");
    const storedPlayers = JSON.parse(sessionStorage.getItem('players'));
    if (storedPlayers) {
      return storedPlayers.some(storedPlayers => storedPlayers.id !== '0' && storedPlayers.id === userID);
    }
    return 0;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('https://localhost:8000/tournament/ft_login/?code=' + code, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (!isRegisteredUser(data.user.id)) {
              addPlayer({ username: data.user.username, profile: data.user.profile_pic, id: data.user.id });
              navigate('/tournament');
            } else {
              setError('This user is already registered in the tournament.');
            }
        })
        .catch(error => {
          console.error('Error:', error);
          setError('An error occurred while processing your request.');
        });
    }
  }, [addPlayer, navigate]);

  if (error) {
    return (
      <div>
        There was a problem while trying to authenticate.
        <br />
        {error && <div>{error}</div>}
        {/* https link: */}
        <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2F42_auth%2F&response_type=code">
                {/* http link: */}
                {/* <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F42_auth%2F&response_type=code"> */}
          Want to try again ?
        </a>
      </div>
    );
  }

  return (
    <div>
      Waiting for authentication...
    </div>
  );
};

export default FtAuthTournament;
