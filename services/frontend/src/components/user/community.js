import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from './getProfilePic';

const backendHost = 'http://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function Community() {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]); // Define 'friends' state variable
  const authtoken = sessionStorage.getItem('authtoken');
  const current_user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    fetch(backendHost + '/user/all/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

    // Fetch friends of the current user
    useEffect(() => {
      fetch(backendHost + '/user/friend_list/', {
        headers: {
          'Authorization': `Token ${authtoken}`
        }
      })
        .then(response => response.json())
        .then(data => setFriends(data))
        .catch(error => console.error('Error fetching friends:', error));
    }, [authtoken]); // Trigger fetch on authtoken change

  const handleAddFriend = (userId) => {
    fetch(backendHost + `/user/add_friend/${userId}/`, {
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
      const isFriendInList = friends.some(friend => friend.id === data.friend.id);
      if (!isFriendInList) {
        // If the friend is not in the list, add it
        setFriends([...friends, data.friend]); // Assuming data.friend contains the new friend object
      }
      sessionStorage.setItem('user', JSON.stringify(data.user));
    })
    .catch(error => console.error('Error adding friend:', error));
  }

  const handleRemoveFriend = (userId) => {
    fetch(backendHost + `/user/remove_friend/${userId}/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${authtoken}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to remove friend');
      }
      return response.json();
    })
    .then(data => {
      const updatedFriends = friends.filter(friend => friend.id !== userId);
      setFriends(updatedFriends);
      sessionStorage.setItem('user', JSON.stringify(data.user));
    })
    .catch(error => console.error('Error removing friend:', error));
  }

  return (
    <div>
      <h1>Community</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Display All Users (left side) */}
        <div style={{ marginRight: '4em', flex: '1' }}>
          <h2>All Users</h2>
          <ul>
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
          </ul>
        </div>
  
        {/* Display Friends (right side) */}
        <div style={{ flex: '1' }}>
          <h2>Friends</h2>
          <ul>
            {friends.map(friend => (
              <li key={friend.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Link to={`/user_profile/${friend.id}`} style={{ marginRight: '20px' }}>
                  <ProfilePic filename={friend.profile_pic} online={friend.is_online} />
                </Link>
                <span style={{ marginRight: '1em', fontWeight: 'bold' }}>{friend.username}</span>
                <span>{friend.is_online ? 'Online' : 'Offline'}</span>
                <button onClick={() => handleRemoveFriend(friend.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Community;