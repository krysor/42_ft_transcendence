import React, { useEffect } from 'react';

const Ft_auth = () => {
    useEffect(() => {
        // Extract the code parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // Send a POST request to your Django backend with the code
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
			})
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <div>
            waiting authentication...
        </div>
    );
};

export default Ft_auth;

