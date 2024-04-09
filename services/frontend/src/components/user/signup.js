import React from 'react';
import getCookie from '../utils/getCoockies';

class Signup extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

		const csrftoken = getCookie('csrftoken');
        const formData = new FormData(event.target);
        const JsonData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        fetch('http://localhost:8000/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
							'X-CSRFToken': csrftoken},
                            body: JSON.stringify(JsonData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to register new user')
                }
                return response.json();
            })
            .then(data => {
                const userData = JSON.parse(data.user)[0].fields;
                console.log('User data:', userData);
                localStorage.setItem('username', userData.username);
                localStorage.setItem('password', userData.password);
                window.location.href = "/";
            })
            .catch(error => {console.error('There was a problem with the fetch operation:', error);});
    }

    render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input id="username" name="username" type="text" />
          <br></br>
          <label htmlFor="email">Enter mail</label>
          <input id="email" name="email" type="mail" />
          <br></br>
          <label htmlFor="password">Enter your password</label>
          <input id="password" name="password" type="password" />
          <br></br>
          <button>sign up!</button>
            </form>

    );
    }
}

export default Signup;