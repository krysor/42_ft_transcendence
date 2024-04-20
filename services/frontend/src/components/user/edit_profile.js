import React, { useState, useEffect } from "react";
import getUserData from "./getUserData";

function EditProfile () {
    const authtoken = sessionStorage.getItem('authtoken');
    const [userData, setUserData] = useState(null);
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserData();
            setUserData(user);
        };
        fetchData();
    }, [authtoken]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newUsername.length > 20) {
            setUsernameError('Username must be 20 characters or less')
            return;
        }

        if (newPassword.length < 6 && newPassword.length > 0) {
            setPasswordError('Password must be at least 6 characters long')
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', newUsername);
            formData.append('password', newPassword);
            if (newProfilePic) {
                formData.append('profile_pic', newProfilePic);
            }
            fetch('http://localhost:8000/user/edit_profile/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${authtoken}`
                },
                body: formData
            })
            .then(response => {
				if (!response.ok) {
				  this.setState({ loginError: 'Invalid username or password.' });
				  throw new Error('Network response was not ok');
				}
		
				return response.json();
			  })
			.then(data => {
				console.log(data);
				sessionStorage.setItem('user', JSON.stringify(data.user));
				window.location.href = "/profile";
			  })
			
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChangeUsername = (event) => {
        setNewUsername(event.target.value);
    };

    const handleChangePassword = (event) => {
        setnewPassword(event.target.value);
    };

    const handleFileChange = (event) => {
        setNewProfilePic(event.target.files[0]);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit profile</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="username">New username: </label>
                <input id="username" name="username" type="text" value={newUsername} onChange={handleChangeUsername} />
                {usernameError && <div>{usernameError}</div>}
                <br />
                <label htmlFor="password">New password: </label>
                <input id="password" name="password" type="text" value={newPassword} onChange={handleChangePassword} />
                {passwordError && <div>{passwordError}</div>}
                <br />
                <label htmlFor="profile_pic">Upload new profile picture: </label>
                <input id="profile_pic" name="profile_pic" type="file" onChange={handleFileChange} />
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditProfile;
