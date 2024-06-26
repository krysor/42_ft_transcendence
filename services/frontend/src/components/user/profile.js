import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";
import getUserData from "./getUserData";
import './profile.css'; // Assurez-vous d'importer le fichier CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next'

function Profile() {
    const authtoken = sessionStorage.getItem('authtoken');
    const { t } = useTranslation();
    console.log("profile");
    const [userData, setUserData] = useState({
        username: '',
        profile_pic: '',
        loss: 0,
        win: 0,
        language: "eng",
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
        <div className="profile container mt-5">
            <div className="profile_pic_username d-flex align-items-center mb-4">
                {profile_pic && <ProfilePic filename={profile_pic} online="" size={100} className="rounded-circle" />}
                {username && <h2 className="ml-3">{username}</h2>}
            </div>
            <br/>


            
            <div className="mb-3">
                {loss !== null && <h4 className="text-danger">{t('Games lost')}: {loss}</h4>}
                {win !== null && <h4 className="text-success">{t('Games won')}: {win}</h4>}
            </div>

            <h3>{t('Matches')}:</h3>
            <ul className="match-list">
                {matches && matches.map(match => (
                    <div className="match-historic" key={match.id}>
                        <li className="match-item list-group-item mb-3 p-3">
                            <div className="match-detail d-flex justify-content-between align-items-center">
                            {match.p1 ? (
                                <Link to={`/user_profile/${match.p1.id}`} className="mr-3">
                                    <ProfilePic filename={match.p1.profile_pic || '/default_pp.jpeg'} online="" size={40} className="rounded-circle" />
                                </Link>
                            ) : (
                                <img src="/default_pp.jpeg" alt="Anonyme" className="mr-3 rounded-circle" style={{ width: 40, height: 40 }} />
                            )}
                            <h5>{match.p1 ? match.p1.username : 'Anonyme'} {match.p1_score} vs {match.p2_score} {match.p2 ? match.p2.username : 'Anonyme'}</h5>
                            {match.p2 ? (
                                <Link to={`/user_profile/${match.p2.id}`} className="ml-3">
                                    <ProfilePic filename={match.p2.profile_pic || '/default_pp.jpeg'} online="" size={40} className="rounded-circle" />
                                </Link>
                            ) : (
                                <img src="/default_pp.jpeg" alt="Anonyme" className="ml-3 rounded-circle" style={{ width: 40, height: 40 }} />
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
            <NavLink to="/edit_profile" className="btn btn-secondary mt-4">{t('Edit Profile')}</NavLink>
        </div>
    );
}

export default Profile;
