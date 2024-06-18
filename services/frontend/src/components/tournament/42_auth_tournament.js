import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTournament } from './TournamentContext';

const FtAuthTournament = () => {
  const [error, setError] = useState('');
  const { addPlayer } = useTournament();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('http://localhost:8000/tournament/ft_login/?code=' + code, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            addPlayer({ username: data.user.username, profile: data.user.profile_pic, id: data.user.id });
            navigate('/tournament');
          } else if (data.error) {
            setError(data.error);
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
        <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Ftournament%2F&response_type=code">
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
