import React, { useState, useEffect } from 'react';
import './ProfilePic.css'; // Importer le fichier CSS

const backendHost = 'https://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function ProfilePic({ filename, online, size = 40 }) {
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const url_request = `${backendHost}/user/profile_pic${filename}`;

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
    }, [filename]);

    if (!profilePicUrl) {
        return <img src='loading.gif' width="50" style={{ borderRadius: '50%' }} />;
    }

    return (
        <div className={`profile_pic profile_pic_size_${size}`}>
            <img src={profilePicUrl} alt="Profile Picture" style={{ borderRadius: '50%' }} />
            {online && <div className="online_indicator" />}
        </div>
    );
}

export default ProfilePic;
