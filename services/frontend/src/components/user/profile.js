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
            console.log(user);
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

            <h3>Matches:</h3>
            {userData.matches && <h2>{userData.matches.id}</h2>}
            {/* <ul>
            {users.map(user => (
              <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Link to={`/user_profile/${user.id}`} style={{ marginRight: '20px' }}>
                  <ProfilePic filename={user.profile_pic} online={user.is_online} />
                </Link>
                <span style={{ marginRight: '1em', fontWeight: 'bold' }}>{user.username}</span>
                {current_user.id !== user.id && !friends.some(friend => friend.id === user.id) && (
                  <button onClick={() => handleAddFriend(user.id)}>Add friend</button>
                )}
              </li>
            ))}
            </ul> */}
            <NavLink to="/edit_profile">Edit Profile</NavLink>
        </div>
    );
}

export default Profile;