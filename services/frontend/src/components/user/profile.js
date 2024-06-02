import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";
import getUserData from "./getUserData";
import './profile.css'; // Assurez-vous d'importer le fichier CSS

function Profile() {
    const authtoken = sessionStorage.getItem('authtoken');
    const [userData, setUserData] = useState({
        username: '',
        profile_pic: '',
        loss: 0,
        win: 0,
        matches: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserData();
            setUserData(user);
            console.log(user);
        };
        fetchData();
    }, [authtoken]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { username, profile_pic, loss, win, matches } = userData;

    return (
        <div>
            {profile_pic && <ProfilePic filename={profile_pic} online="" size={100} />}
            <br/>

            {username && <h2>Username: {username}</h2>}
            {loss !== null && <h3>Games Lost: {loss}</h3>}
            {win !== null && <h3>Games Won: {win}</h3>}

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
            <NavLink to="/edit_profile">Edit Profile</NavLink>
        </div>
    );
}

export default Profile;
