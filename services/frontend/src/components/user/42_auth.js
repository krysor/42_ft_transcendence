import React, { useEffect, useState } from 'react';

const Ft_auth = () => {
    const [error, setError] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            fetch('http://localhost:8000/user/42_auth/?code=' + code, {
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
                    window.location.href = "/";
                }
                else if (data.error){
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
            </div>
        );
    }

    return (
        <div>
            waiting authentication...
        </div>
    );
};

export default Ft_auth;

