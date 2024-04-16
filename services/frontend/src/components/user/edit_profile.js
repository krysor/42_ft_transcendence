import React, { useState, useEffect } from "react";
import getUserData from "./getUserData";

function EditProfile () {
    const authtoken = sessionStorage.getItem('authtoken');
    const [userData, setUserData] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserData();
            setUserData(user);
        };
        fetchData();
    }, [authtoken]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', newUsername);
            if (newProfilePic) {
                formData.append('profile_pic', newProfilePic);
            }
            const response = await fetch('http://localhost:8000/user/edit_profile/', {
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
				window.location.href = "/";
			  })
			
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChangeUsername = (event) => {
        setNewUsername(event.target.value);
    };

    const handleFileChange = (event) => {
        setNewProfilePic(event.target.files[0]);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { username, profile_pic, loss, win } = userData;

    return (
        <div>
            {profile_pic && <img src={profile_pic} alt="Profile" className="profile_pic" />}
            {username && <h2>Username: {username}</h2>}
            <p>This is the edit page</p>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="username">Edit username: </label>
                <input id="username" name="username" type="text" value={newUsername} onChange={handleChangeUsername} />
                <br />
                <label htmlFor="profile_pic">Upload profile picture: </label>
                <input id="profile_pic" name="profile_pic" type="file" onChange={handleFileChange} />
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditProfile;
