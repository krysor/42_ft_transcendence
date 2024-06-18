import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import { useTranslation } from 'react-i18next'

const backendHost = 'http://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function Community() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]); // Initialize 'friends' as an empty array
  const authtoken = sessionStorage.getItem('authtoken');
  const current_user = JSON.parse(sessionStorage.getItem('user'));
  const { t } = useTranslation();

  useEffect(() => {
    fetch(backendHost + '/user/all/')
      .then(response => response.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
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
      .then(data => {
        if (data) {
          setFriends(Array.isArray(data) ? data : []);
        } else {
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('authtoken');
          navigate('/home');
        }
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authtoken');
        navigate('/home');
      });
  }, [authtoken, navigate]); // Trigger fetch on authtoken change

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
      <h1>{t('Community')}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Display All Users (left side) */}
        <div style={{ marginRight: '4em', flex: '1' }}>
          <h2>{t('Users')}</h2>
          <ul>
            {users.map(user => (
              <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Link to={`/user_profile/${user.id}`} style={{ marginRight: '20px' }}>
                  <ProfilePic filename={user.profile_pic} online={false} />
                </Link>
                <span style={{ marginRight: '1em', fontWeight: 'bold' }}>{user.username}</span>
                {current_user.id !== user.id && !friends.some(friend => friend.id === user.id) && (
                  <button onClick={() => handleAddFriend(user.id)}>{t('Add friend')}</button>
                )}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Display Friends (right side) */}
        <div style={{ flex: '1' }}>
          <h2>{t('Friends')}</h2>
          <ul>
            {friends.map(friend => (
              <li key={friend.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Link to={`/user_profile/${friend.id}`} style={{ marginRight: '20px' }}>
                  <ProfilePic filename={friend.profile_pic} online={friend.is_online} />
                </Link>
                <span style={{ marginRight: '1em', fontWeight: 'bold' }}>{friend.username}</span>
                <button onClick={() => handleRemoveFriend(friend.id)}>{t('Remove friend')}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Community;
