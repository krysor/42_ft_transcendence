import React, { useState, useEffect } from 'react';

function Community() {
  const [users, setUsers] = useState([]);
  const authtoken = sessionStorage.getItem('authtoken');
  const current_user = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    fetch('http://localhost:8000/user/all/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

const handleAddFriend = (userId) => {
	fetch(`http://localhost:8000/user/add_friend/${userId}/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'Authorization': `Token ${authtoken}`
		},
	})
	.then (response => {
		if (!response.ok) {
			throw new Error('failed to add friend')
		}
	})
	.catch(error => console.error('Error adding friend:', error));
}
  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
			{user.profile_pic && <img src={user.profile_pic} alt="Profile Pic" width="50" />}
            {user.username}
			{current_user.id !== user.id && (
              <button onClick={() => handleAddFriend(user.id)}>Add friend</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Community;