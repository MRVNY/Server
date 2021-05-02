import React from 'react';

class Login extends React.Component {
    login(data) {
        const { login, password } = data
        this.props.api.post('/user/login', { "login": login, "password": password },)
            .then(response => {
                console.log(response);
                if (response) this.props.login(response.data.id);
            }).catch(e => {
                alert(e);
            });
    }

    send(event) {
        var toSend = {
            login: this.refs.login.value,
            password: this.refs.password.value,
        }
        this.login(toSend)
    }

    render() {
        return <div>
            <div className="form">
                <h2>Login To Join The Fun</h2>
                <div>
                    <label>Login</label>
                    <input type="text" ref="login" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" ref="password" />
                </div>
            </div>

            <button onClick={event => { this.send() }}>Log In</button>
        </div>;
    }
}

export default Login;
