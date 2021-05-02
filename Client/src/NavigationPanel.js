import React from 'react';
import Login from './Login'

class NavigationPanel extends React.Component {

    logout() {
        this.props.api.delete('/user/' + this.props.id)
            .then(response => {
                console.log(response);
                if (response) this.props.logout();
            });
    }
    
    search(data){
        const { login } = data
        this.props.toProfile(login)
        this.refs.login.value=""
    }

    send(event){
        var toSend = {
            login : this.refs.login.value
        }
        this.search(toSend)
    }
    
    render() {
        const { login, signup, isConnected, api, toFeeds, currentPage, toHome } = this.props;
        
        return <nav id="navPanel">
        <header>
            <div className="userHeader">
            {(isConnected) && <img src="blathers.jpg" alt="icon" onClick={() => {toHome()}}/> }
            {(isConnected) && <button onClick={event => { this.logout() }}>Logout</button>}
            {(!isConnected && <div>Not logged in</div>)}
            </div>

            <img src="sorbonne.png" alt="icon" onClick={event => {toFeeds()}}/> 
            
            <div className="search">
            <input type="text" ref="login"/>
            <button onClick={event => {this.send()}}>Search</button>
            </div>
        </header>

        {(currentPage==='login' || currentPage==='signup' || (!isConnected && currentPage==='feeds'))
            && <Login login={login} api={api} />}
        {(currentPage==='login' || (!isConnected && currentPage==='feeds')) && <p>
            <label>No account?  </label>
            <button onClick={() => { signup(); }}>Sign Up</button>
        </p>}
        </nav>;
    }
}

export default NavigationPanel;
