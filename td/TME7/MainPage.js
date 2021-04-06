import React from 'react';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'login', // valeurs possibles: 'login', 'messages', 'signin',
      isConnected: false,
    }
  }

  setConnected = () => {
    this.setState({
      isConnected: true,
      currentPage: 'messages',
    });
  }

  setLogout = () => {
    this.setState({
      isConnected: false,
      currentPage: 'login',
    });
  }

  signup = () => {
    this.setState({ currentPage: 'signup' });
  }

  render() {
    const { isConnected, currentPage } = this.state;

    return <div>
      <h1>Birdy !</h1>
      <NavigationPanel
        isConnected={isConnected}
        login={() => { this.setConnected() }}  
        logout={() => { this.setLogout() }}  
        signup={() => { this.signup() }}
      />
      <main>
        {currentPage === 'messages'
          && <MessagesPage />}
        {currentPage === 'signup'
          && <p>Formulaire d'inscription, à faire (composant SignUp)</p>}
      </main>
    </div>;
  }
}

export default MainPage;
