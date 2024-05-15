import React from 'react';
import { useUsers } from './UserContext';
import ProfilePic from '../user/getProfilePic';

const Participants = () => {
  const { users } = useUsers();

  return (
    <div>
      <h2>Tournament Participants:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Username: {user.username}, Profile Picture: {user.profile}
            <ProfilePic filename={user.profile} online={user.is_online}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;
