import React, {useState, useEffect} from "react";

function Profile () {
	const authtoken = localStorage.getItem('authtoken');
	const [username, setUsername] = useState(null)
	const [profile, setProfile] = useState(null)

	fetch('http://localhost:8000/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authtoken}`
        },
      })
	  .then (response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			  }
	  
			  return response.json();
			})
			.then(data => {
			  console.log(data);
			  setUsername(data.user.username)
			  setProfile(data.user.profile_pic)
			})

	return (
		<div>
			<h1>Profile page</h1>
			<p>This is your profile page </p>
			{username && <p>Username: {username}</p>}
			{profile && <img src="{profile}"></img>}
			<p>TEST</p>
		</div>
	);
}

export default Profile;