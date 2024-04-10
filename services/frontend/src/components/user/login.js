import React from 'react';

import getCookie from '../utils/getCoockies';

class Login extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
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
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.Token) {
          sessionStorage.setItem('authtoken', data.Token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
          console.log("token succesfully stored")
          window.location.href = "/";
        }
      })
      .catch(error => {console.error('There was a problem with the fetch operation:', error);});
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input id="username" name="username" type="text" />
          <br></br>
          <label htmlFor="password">Enter your password</label>
          <input id="password" name="password" type="password" />
          <br></br>
          <button>Login !</button>
        </form>
      );
    }
  }



export default Login;