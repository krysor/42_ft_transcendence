import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import { useParams, Link } from 'react-router-dom';
import './profile.css';
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
        }, []);

        if (user_id === "0") {
            return (
                <p>This user is a guest and so doesn't have a user page :c</p>
            );
        }
    if (!userData) {
        return <div>Loading...</div>;
    }


    const { username, profile_pic, loss, win, matches } = userData;

    return (
        <div>
            {profile_pic && <ProfilePic filename={profile_pic} online="" size={100} />}
            <br/>
            {username && <h2>Username: {username}</h2>}
            {loss !== null && <h3>game lost: {loss}</h3>}
            {win !== null && <h3>game win: {win}</h3>}


            <ul className="match-list">
                {matches && matches.map(match => (
                    <>
                    <h3>Matches:</h3>
                    <li key={match.id} className="match-item">
                        <div className="match-detail">
                            {match.p1 && (
                                <Link to={`/user_profile/${match.p1.id}`} style={{ marginRight: '20px' }}>
                                    <ProfilePic filename={match.p1.profile_pic} online="" size={40} />
                                </Link>
                            )}
                            <h3>{match.p1 ? match.p1.username : 'Unknown'} {match.p1_score} vs {match.p2_score} {match.p2 ? match.p2.username : 'Unknown'}</h3>
                            {match.p2 && (
                                <Link to={`/user_profile/${match.p2.id}`} style={{ marginLeft: '20px' }}>
                                    <ProfilePic filename={match.p2.profile_pic} online="" size={40} />
                                </Link>
                            )}
                        </div>
                        <span>Date: {match.date}</span>
                    </li>
                    </>
                ))}
            </ul>
        </div>
    );
}

export default UserPage;