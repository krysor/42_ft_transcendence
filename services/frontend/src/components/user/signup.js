import React, { useState } from 'react';
import getCookie from '../utils/getCoockies';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

		const csrftoken = getCookie('csrftoken');
        try {
            const response = await fetch('http://localhost:8000/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
							'X-CSRFToken': csrftoken},
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Inscription réussie
                console.log('User registered successfully');
                // Redirigez l'utilisateur vers une page de connexion ou une autre page appropriée
            } else {
                // Erreur lors de l'inscription
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

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