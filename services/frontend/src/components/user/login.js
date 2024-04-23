import React from 'react';

import getCookie from '../utils/getCoockies';

class Login extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        loginError: ''
      };
    }

    handleSubmit(event) {
      event.preventDefault();

      this.setState({ usernameError: '', passwordError: '' });

      const username = event.target.username.value;
      if (username.length > 20) {
        this.setState({ usernameError: 'Username must be 20 characters or less' });
        return;
      }

      const password = event.target.password.value;
      if (password.length < 6) {
        this.setState({ passwordError: 'Password must be at least 6 characters long' });
        return;
      }

      const csrftoken = getCookie('csrftoken');
      const formData = new FormData(event.target);
      const jsonData = {
        username: formData.get('username'),
        password: formData.get('password')
      };

      fetch('http://localhost:8000/user/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'X-CSRFToken': csrftoken},
                  body: JSON.stringify(jsonData)
      })
      .then(response => {
        if (!response.ok) {
          this.setState({ loginError: 'Invalid username or password.' });
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.Token) {
          sessionStorage.setItem('authtoken', data.Token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = "/";
        }
        else {
          this.setState({ loginError: 'Invalid username or password.' });
        }
      })
      .catch(error => {console.error('There was a problem with the fetch operation:', error);});
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter username: </label>
          <input id="username" name="username" type="text" />
          {this.state.usernameError && <div>{this.state.usernameError}</div>}
          <br />
          <label htmlFor="password">Enter your password: </label>
          <input id="password" name="password" type="password" />
          {this.state.passwordError && <div>{this.state.passwordError}</div>}
          {this.state.loginError && <div>{this.state.loginError}</div>}
          <br />
          <button>Login !</button>
        </form>
      );
    }
  }



export default Login;