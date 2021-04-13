import React from 'react';
import Login from './Login'
import Logout from './Logout'

class NavigationPanel extends React.Component {
  render() {
    const { login, logout, signup, isConnected, api } = this.props;
    
    return <nav id="navPanel">
      {isConnected
        ? <Logout logout={logout} api={api} />
        : <Login login={login} api={api} />}
      {!isConnected && <p>
        Pas encore de compte ?
        <button onClick={() => { signup(); }}>Sign Up</button>
      </p>}
    </nav>;
  }
}

export default NavigationPanel;
