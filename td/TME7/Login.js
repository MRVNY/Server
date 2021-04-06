import React from 'react'

class Login extends React.Component {
  render() {
    return <div className="LoginForm">
      <h2>Connexion</h2>
      <p>Mettre le formulaire login/mot de passe ici…</p>
      <button onClick={() => { this.props.login() }}>Se connecter</button>
    </div>;
  }
}

export default Login;
