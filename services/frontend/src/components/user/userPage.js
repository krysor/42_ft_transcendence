import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import { useParams, Link } from 'react-router-dom';
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendHost = 'http://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function UserPage() {
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
        <div className="profile container mt-5">
            <div className="profile_pic_username d-flex align-items-center mb-4">
                {profile_pic && <ProfilePic filename={profile_pic} online="" size={100} className="rounded-circle" />}
                {username && <h2 className="ml-3">{username}</h2>}
            </div>
            <br/>

            <div className="mb-3">
                {loss !== null && <h4 className="text-danger">Games Lost: {loss}</h4>}
                {win !== null && <h4 className="text-success">Games Won: {win}</h4>}
            </div>

            <h3>Matches:</h3>
            <ul className="match-list">
                {matches && matches.map(match => (
                    <div className="match-historic" key={match.id}>
                        <li className="match-item list-group-item mb-3 p-3">
                            <div className="match-detail d-flex justify-content-between align-items-center">
                                {match.p1 && (
                                    <Link to={`/user_profile/${match.p1.id}`} className="mr-3">
                                        <ProfilePic filename={match.p1.profile_pic} online="" size={40} className="rounded-circle" />
                                    </Link>
                                )}
                                <h5>{match.p1 ? match.p1.username : 'Unknown'} {match.p1_score} vs {match.p2_score} {match.p2 ? match.p2.username : 'Unknown'}</h5>
                                {match.p2 && (
                                    <Link to={`/user_profile/${match.p2.id}`} className="ml-3">
                                        <ProfilePic filename={match.p2.profile_pic} online="" size={40} className="rounded-circle" />
                                    </Link>
                                )}
                            </div>
                            <span className="text-muted">
                                {match.is_pong && (
                                    <p>Pong</p>
                                )}
                                {!match.is_pong && (
                                    <p>Morpion</p>
                                )}
                                {match.date}
                            </span>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default UserPage;