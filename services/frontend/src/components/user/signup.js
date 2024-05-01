import React, { useState } from "react";

const backendHost = 'http://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function Signup () {
    const [error, setError] = useState('');
 
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const JsonData = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        fetch(backendHost + '/user/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(JsonData)
            })
            .then(response => { return response.json(); })
            .then(data => {
                if (data.Token)
                {
                    sessionStorage.setItem('authtoken', data.Token);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = "/";
                }
                else if (data.error){
                    setError(data.error);
                }
                else{
                    throw new Error('Failed to register new user')
                }
            })
            .catch(error => { console.error('There was a problem with the fetch operation:', error); });
    };


    return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Enter username: </label>
          <input id="username" name="username" type="text" />
          <br />
          <label htmlFor="password">Enter your password: </label>
          <input id="password" name="password" type="password" />
          <br />
          <button>Sign up !</button>
          <br />
          <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F42_auth%2F&response_type=code">
            Login with 42 authentication !
          </a>
          {error && <div>Error: {error}</div>}
        </form>

    );
}

export default Signup;

// curl -F grant_type=authorization_code \
// -F client_id=u-s4t2ud-ffe04edf766f8a757aae8abe9604a7fa4465cae87ce61cccaa1562056de8bef5 \
// -F client_secret=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 \
// -F code=bf65ee1b19407987c88e71c1f10490c2342735b5dae293328de6e6c356250c1f \
// -F redirect_uri=http://localhost:8000/42_auth \
// -X POST https://api.intra.42.fr/oauth/token