import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfilePic from "./getProfilePic";
import getUserData from "./getUserData";

function Profile() {
    const authtoken = sessionStorage.getItem('authtoken');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserData();
            setUserData(user);
        };
        fetchData();
    }, [authtoken]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { username, profile_pic, loss, win } = userData;

    return (
        <div>
            {profile_pic && <ProfilePic filename={profile_pic} online="" />}
            <br/>
            {username && <h2>Username: {username}</h2>}
            {loss !== null && <h3>game lost: {loss}</h3>}
            {win !== null && <h3>game win: {win}</h3>}
            <NavLink to="/edit_profile">Edit Profile</NavLink>
        </div>
    );
}

export default Profile;