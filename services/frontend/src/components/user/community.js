import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from './getProfilePic';

function Community() {
  const [users, setUsers] = useState([]);
  const authtoken = sessionStorage.getItem('authtoken');
  const current_user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    fetch('http://' + window.location.host.split(':')[0] + ':8000/user/all/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddFriend = (userId) => {
    fetch(`http://' + window.location.host.split(':')[0] + ':8000/user/add_friend/${userId}/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${authtoken}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add friend');
      }
      return response.json();
    })
    .then(data => {
      sessionStorage.setItem('user', JSON.stringify(data.user));
    })
    .catch(error => console.error('Error adding friend:', error));
  }

  return (
    <div>
      <h1>Community</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Link to={`/user_profile/${user.id}`} style={{ marginRight: '10px' }}>
              <ProfilePic filename={user.profile_pic} online={user.is_online} />
            </Link>
            <span style={{ marginLeft: '2em' , marginRight: '2em', fontWeight: 'bold' }}>{user.username}</span>
            {current_user.id !== user.id && (
              <button onClick={() => handleAddFriend(user.id)}>Add friend</button>
            )}
            <br/>
            <br/>
            <br/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Community;