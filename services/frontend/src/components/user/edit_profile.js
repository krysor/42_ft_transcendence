import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';

const backendHost = 'http://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function EditProfile() {
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

        const languageSelect = event.target.languageSelect.value;
        if (languageSelect) {
            formData.append('language', languageSelect);
        }
        
        fetch(backendHost + '/user/edit_profile/', {
            method: 'POST',
            headers: { 'Authorization': `Token ${authtoken}` },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.user) {
                    i18next.changeLanguage(data.user.language);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = "/profile";
                } else if (data.error) {
                    setError(data.error);
                } else {
                    throw new Error('Failed to register new user');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h1>Edit Profile</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="username">New Username:</label>
                                    <input id="username" name="username" type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">New Password:</label>
                                    <input id="password" name="password" type="text" className="form-control" />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="profile_pic">Upload New Profile Picture:</label>
                                    <br />
                                    <input id="profile_pic" name="profile_pic" type="file" className="form-control-file" />
                                </div>
                                <br />
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-secondary active">
                                    <input type="radio" name="languageSelect" id="eng" value="eng" autoComplete="off" /> English
                                    </label>
                                    <label className="btn btn-secondary">
                                    <input type="radio" name="languageSelect" id="fr" value="fr" autoComplete="off" /> Français
                                    </label>
                                    <label className="btn btn-secondary">
                                    <input type="radio" name="languageSelect" id="nl" value="nl" autoComplete="off" /> Nederlands
                                    </label>
                                </div>
                                <br />
                                {error && <div className="alert alert-danger mt-3">Error: {error}</div>}
                                <button type="submit" className="btn btn-primary btn-block">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
