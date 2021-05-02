import React from 'react';
import axios from 'axios';
import NavigationPanel from './NavigationPanel';
import ProfilePage from './ProfilePage';
import SignUp from './SignUp';
import FeedsPage from './FeedsPage';
import FriendsPage from './FriendsPage';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0,
            profileID: 0,
            currentPage: 'login',
            isConnected: false,
        }
        this.api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: { 'X-Custom-Header': 'foobar' }
        });
    }

    setConnected(id) {
        this.setState({
            user: id,
            profileID: id,
            isConnected: true,
            currentPage: 'none',
        });
        this.setState({
            currentPage: 'feeds',
        });
    }

    setLogout = () => {
        this.setState({
            user: 0,
            isConnected: false,
            currentPage: 'none'
        });
        this.setState({
            currentPage: 'login'
        });
    }

    signup = () => {
        this.setState({ currentPage: 'signup' });
    }

    toFeeds = () => {
        this.setState({
            currentPage: 'none'
        });
        this.setState({
            currentPage: 'feeds'
        })
    }

    toProfile(profileName) {
        this.api.get("/user/search/" + profileName)
            .then(response => {
                console.log(response);
                if (response !== undefined) {
                    this.setState({
                        profileID: response.data.rowid,
                        currentPage: 'none',
                    });
                    this.setState({ currentPage: 'profile' });
                }
            }).catch(e => {
                alert(e);
            });
    }

    toHome() {
        this.setState({
            profileID: this.state.user,
            currentPage: 'home',
        });
    }

    toFriends = () => {
        this.setState({
            currentPage: 'none'
        });
        this.setState({
            currentPage: 'friends'
        })
    }

    render() {
        const { isConnected, currentPage, user, profileID } = this.state;

        return <div>

            <NavigationPanel
                isConnected={isConnected}
                currentPage={currentPage}
                login={(id) => { this.setConnected(id) }}
                logout={() => { this.setLogout() }}
                signup={() => { this.signup() }}
                api={this.api}
                id={this.state.user}
                toFeeds={() => { this.toFeeds() }}
                toProfile={(profileID) => { this.toProfile(profileID) }}
                toHome={() => { this.toHome() }}
            />
            <main>
                {(currentPage === 'login' || currentPage === 'feeds')
                    && <FeedsPage api={this.api} id={user} profileID={profileID} toProfile={(id) => { this.toProfile(id) }} />}
                {currentPage === 'profile'
                    && <ProfilePage api={this.api} id={user} profileID={profileID} toProfile={(id) => { this.toProfile(id) }} toFriends={() => { this.toFriends() }} toLogin={() => { this.setLogout() }} />}
                {currentPage === 'home'
                    && <ProfilePage api={this.api} id={user} profileID={profileID} toProfile={(id) => { this.toProfile(id) }} toFriends={() => { this.toFriends() }} toLogin={() => { this.setLogout() }} />}
                {currentPage === 'signup'
                    && <SignUp api={this.api} cancel={() => { this.setLogout() }} />}
                {currentPage === 'friends'
                    && <FriendsPage api={this.api} id={user} toProfile={(id) => { this.toProfile(id) }} />}
            </main>
        </div>;
    }
}

export default MainPage;
