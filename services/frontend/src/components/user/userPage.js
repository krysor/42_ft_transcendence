import React, { useState, useEffect } from "react";
import ProfilePic from "./getProfilePic";
import { useParams } from 'react-router-dom';

const backendHost = 'http://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function UserPage() {
    // const authtoken = sessionStorage.getItem('authtoken');
	const { user_id } = useParams();
    const [userData, setUserData] = useState(null);
	const url_request = backendHost + '/user/get_user_by_id/' + user_id
        useEffect(() => {
			fetch(url_request)
				.then(response => response.json())
				.then(data => setUserData(data))
				.catch(error => console.error('Error fetching users:', error));
		});

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { username, profile_pic, loss, win, is_online } = userData;

    return (
        <div>
            {profile_pic && <ProfilePic filename={profile_pic} online={is_online} />}
            <br/>
            {username && <h2>Username: {username}</h2>}
            {loss !== null && <h3>game lost: {loss}</h3>}
            {win !== null && <h3>game win: {win}</h3>}
        </div>
    );
}

export default UserPage;