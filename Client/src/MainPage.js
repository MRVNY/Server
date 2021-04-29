import React from 'react';
import axios from 'axios';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';
import FeedsPage from './FeedsPage';


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
      currentPage: 'feeds',
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

  toMsg = () => {
    this.setState({
      currentPage: 'messages',
    });
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
        id={this.state.user}
      />
      <main>
        {(currentPage === 'login' || currentPage === 'feeds')
          && <FeedsPage api={this.api} id={this.state.user}/>}
        {currentPage === 'messages'
          && <MessagesPage api={this.api} id={this.state.user}/>}
        {currentPage === 'signup'
          && <SignUp api={this.api} cancel={() => { this.setLogout() }}/>}
      </main>
    </div>;
  }
}

export default MainPage;
