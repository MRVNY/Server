import React from 'react';

class Login extends React.Component {    
    login(data){
        const { login, password } = data
        this.props.api.post('/user/login',{"login":login,"password":password},) 
            .then(response => {
                console.log(response);
                if(response) this.props.login();
        });
    }

    send(event){
        var toSend = {
            login : this.refs.login.value,
            password : this.refs.password.value,
        }
        this.login(toSend)
    }
    
    render(){
    return <div className="LoginForm">
      <h2>Connexion</h2>
      <div>
          <label>Login</label>
          <input type="text" ref="login"/>
      </div>
      <div>
          <label>Password</label>
          <input type="text" ref="password"/>
      </div>
      
      <button onClick={event => {this.send()}}>Log In</button>
    </div>;
  }
}

export default Login;
