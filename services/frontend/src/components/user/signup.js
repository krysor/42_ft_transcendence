import React, { useState } from 'react';
import getCookie from '../utils/getCoockies';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

		const csrftoken = getCookie('csrftoken');
        fetch('http://localhost:8000/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
							'X-CSRFToken': csrftoken},
                body: JSON.stringify(formData)
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

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;