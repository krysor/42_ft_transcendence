import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const FtAuth = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {

            fetch('https://localhost:8000/user/42_auth/?code=' + code, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json()
            })
			.then(data => {
				console.log(data)
                if (data.Token) {

                    sessionStorage.setItem('authtoken', data.Token);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    navigate(`/`);
                }
                else if (data.error) {
					setError(data.error);
				}
                
			})
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, []);

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
            waiting authentication...
        </div>
    );
};

export default FtAuth;

