const backendHost = 'http://' + window.location.hostname + ':8000';

function getUser () {
    const authtoken = sessionStorage.getItem('authtoken');
    fetch(backendHost + '/user/user_detail/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authtoken}`
        },
    })
    .then(response => { return response.json(); })
    .then(data => {
        console.log(data);
        if (data.Token) {
            sessionStorage.setItem('authtoken', data.Token);
            sessionStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        }
        else if (data.error) {
            throw data.error;
        }
    })
    .catch(error => { console.error('There was a problem with the fetch operation:', error); });
}