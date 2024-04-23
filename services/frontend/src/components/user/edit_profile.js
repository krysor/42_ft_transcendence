import React, { useState } from "react";

function EditProfile () {
    const authtoken = sessionStorage.getItem('authtoken');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const newUsername = formData.get('username');
        if (newUsername)
            formData.append('username', newUsername);

        const newPassword = formData.get('password');
        if (newPassword)
            formData.append('password', newPassword);

        const profilePicFile = formData.get('profile_pic');
        if (profilePicFile) {
            formData.append('profile_pic', profilePicFile);
        }

        fetch('http://localhost:8000/user/edit_profile/', {
            method: 'POST',
            headers: { 'Authorization': `Token ${authtoken}` },
            body: formData
        })
        .then(response => { return response.json(); })
        .then(data => {
            console.log(data);
            if (data.user)
            {
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = "/profile";
            }
            else if (data.error){
                setError(data.error);
            }
            else{
                throw new Error('Failed to register new user')
            }
            })
    };

    return (
        <div>
            <h1>Edit profile</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="username">New username: </label>
                <input id="username" name="username" type="text" />
                <br />
                <label htmlFor="password">New password: </label>
                <input id="password" name="password" type="text" />
                <br />
                <label htmlFor="profile_pic">Upload new profile picture: </label>
                <input id="profile_pic" name="profile_pic" type="file" />
                {error && <div>Error: {error}</div>}
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditProfile;
