import React from "react";

function Profile () {
	const authToken = localStorage.getItem('authToken');

	const url = 'http://localhost:8000/user/'
	fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        },
      })
	  .then (response => {
			if (response.ok) {
				throw new Error('Network response was not ok');
			  }
	  
			  return response.json();
			})
			.then(data => {
			  console.log(data);
			})
	return (
		<div>
			<h1>Profile page</h1>
			<p>This i your profile page</p>
		</div>
	);
}

export default Profile;