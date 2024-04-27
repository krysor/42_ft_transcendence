const getUserData = async () => {
    const authtoken = sessionStorage.getItem('authtoken');
    try {
        const response = await fetch('http://' + window.location.host.split(':')[0] + ':8000/user/user_detail/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authtoken}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export default getUserData;