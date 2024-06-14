import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'

const backendHost = 'http://' + window.location.hostname + ':8000'; //becomes useless when we have nginx

function Login() {
    const { t } = useTranslation()
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');

        const formData = new FormData(event.target);
        const jsonData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        fetch(backendHost + '/user/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        })
            .then(response => { return response.json(); })
            .then(data => {
                console.log(data);
                if (data.Token) {
                    i18next.changeLanguage(data.user.language);
                    sessionStorage.setItem('authtoken', data.Token);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = "/";
                }
                else if (data.error) {
                    setError(data.error);
                }
            })
            .catch(error => { console.error('There was a problem with the fetch operation:', error); });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>{t('Login')}</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">{t('Enter your username')}:</label>
                                    <input id="username" name="username" type="text" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">{t('Enter your password')}:</label>
                                    <input id="password" name="password" type="password" className="form-control" required />
                                </div>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}

                                <button type="submit" className="btn btn-primary btn-block">{t('Login')}</button>
                                <br />
								<p>-----{t('or log with 42 intra')}----- </p>
                                <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-26412c396459fecd3b1ce2d889ece2036d24ca300aa21cd337d38320cd80f828&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F42_auth%2F&response_type=code">
                                    <img src="favicon.ico" width="50" />
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
