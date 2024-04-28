import React, { useState, useEffect } from 'react';

function ProfilePic({filename, online}) {
	// const user = JSON.parse(sessionStorage.getItem('user'));
    const [profilePicUrl, setProfilePicUrl] = useState('');
	const url_request = 'http://' + window.location.host.split(':')[0] + ':8000/user/profile_pic' + filename
    useEffect(() => {
        fetch(url_request)
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw new Error('Network response was not ok');
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setProfilePicUrl(url);
            })
            .catch(error => {
                console.error('Error fetching profile picture:', error);
            });
    }, []);

	if (!profilePicUrl)
	{
		return (
			<img src='loading.gif' width="50" style={{ borderRadius: '50%' }} />
		)
	}
    return (
        <div className="profile_pic">
			<img src={profilePicUrl} alt="Profile Picture" width="50" style={{ borderRadius: '50%' }} />
			{online && <div className="online_indicator" />}
    	</div>
  	);
}

export default ProfilePic;