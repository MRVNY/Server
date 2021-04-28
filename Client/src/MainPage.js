import React from 'react';
import axios from 'axios';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: 0,
      currentPage: 'login', // valeurs possibles: 'login', 'messages', 'signin',
      isConnected: false,
    }
    this.api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
  }

  setConnected = (id) => {
    this.setState({
        user: id,
      isConnected: true,
      currentPage: 'messages',
    });
  }

  setLogout = () => {
    this.setState({
        user: 0,
      isConnected: false,
      currentPage: 'login',
    });
  }

  signup = () => {
    this.setState({ currentPage: 'signup' });
  }

  cancel = () => {
    this.setState({ currentPage: 'login' });
  }

  render() {
    const { isConnected, currentPage } = this.state;

    return <div>
      <NavigationPanel
        isConnected={isConnected}
        login={(id) => { this.setConnected(id) }}
        logout={() => { this.setLogout() }}
        signup={() => { this.signup() }}
        api={this.api}
      />
      <main>
        
        {currentPage === 'messages'
          && <MessagesPage api={this.api} id={this.state.user}/>}
        {currentPage === 'signup'
          && <SignUp api={this.api} cancel={() => { this.cancel() }}/>}
      </main>
    </div>;
  }
}

export default MainPage;
