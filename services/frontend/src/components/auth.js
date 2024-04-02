import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// function Login() {
// 	// useEffect(() => {
//     //     fetch('http://localhost:8000/login/')
//     //         .then(response => {
//     //             if (!response.ok) {
//     //                 throw new Error('Network response was not ok');
//     //             }
//     //             return response.json();
//     //         })
//     //         .then(data => console.log(data))
//     //         .catch(error => console.error('Error:', error));
//     //     }, []);
//     fetch('http://localhost:8000/login')
// }


function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
}

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
      // fetch('http://localhost:8000/api-token-auth/'
      fetch('http://localhost:8000/login_page/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'X-CSRFToken': csrftoken},
        body: JSON.stringify(jsonData)
      })
      .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}

        localStorage.setItem('authtoken', response.data.token);
        this.props.history.push('/');
      })
      .then(data => {console.log(data);})
      .catch(error => {console.error('There was a problem with the fetch operation:', error);});
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input id="username" name="username" type="text" />
          <br></br>
          <label htmlFor="email">Enter your password</label>
          <input id="password" name="password" type="password" />
          <br></br>
          <button>Send data!</button>
        </form>
      );
    }
  }



export default Login;