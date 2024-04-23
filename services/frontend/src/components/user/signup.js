import React, { useState } from "react";

function Signup () {
    const [error, setError] = useState('');
 
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const JsonData = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        fetch('http://localhost:8000/user/signup/', {
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
          {error && <div>Error: {error}</div>}
          <br />
          <button>Sign up !</button>
        </form>

    );
}

export default Signup;