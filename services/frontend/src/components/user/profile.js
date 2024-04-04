import React from "react";

function About () {
	console.log(localStorage.getItem('username'))

	const url = 'http://localhost:8000/user/' + localStorage.getItem('username')
	fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
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

export default About;