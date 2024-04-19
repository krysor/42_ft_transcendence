import React, { useState, useEffect } from 'react';

function ProfilePic() {
	const user = JSON.parse(sessionStorage.getItem('user'));
    const [profilePicUrl, setProfilePicUrl] = useState('');
	const url = 'http://localhost:8000/user/profile_pic' + user.profile_pic
    useEffect(() => {
        fetch(url)
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

    return (
        <div>
            <img src={profilePicUrl} alt="Profile Picture" className="profile_pic" />
        </div>
    );
}

export default ProfilePic;