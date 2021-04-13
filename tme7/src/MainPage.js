import React from 'react';
import axios from 'axios';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'login', // valeurs possibles: 'login', 'messages', 'signin',
      isConnected: false,
    }
    this.api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
  }

  /*
  componentDidMount(){
    this.api = axios.create({
    baseURL : '/api/',
    timeout : 1000,
    headers : {'X-Custom-Header' : 'foobar'}
    });
}*/

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

  cancel = () => {
    this.setState({ currentPage: 'login' });
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
        api={this.api}
      />
      <main>
        
        {currentPage === 'messages'
          && <MessagesPage />}
        {currentPage === 'signup'
          && <SignUp api={this.api} cancel={() => { this.cancel() }}/>}
      </main>
    </div>;
  }
}

export default MainPage;
