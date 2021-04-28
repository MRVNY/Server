import React from 'react';

class SignUp extends React.Component {  
    singup(data){
        const { login, password, lastname, firstname } = data

        this.props.api.put('/user',{"login":login, "password":password, "lastname":lastname, "firstname":firstname},) 
            .then(response => {
                console.log(response);
        });
    }

    send(event){
        var toSend = {
            login : this.refs.login.value,
            password : this.refs.password.value,
            firstname : this.refs.firstname.value,
            lastname : this.refs.lastname.value
        }
        this.singup(toSend)
    }
    
    render(){
    return <div  className = 'center'>
      <div>
          <label>Login</label>
          <input type="text" ref="login"/>
      </div>
      <div>
          <label>Password</label>
          <input type="text" ref="password"/>
      </div>
      <div>
          <label>LastName</label>
          <input type="text" ref="lastname"/>
      </div>
      <div>
          <label>FirstName</label>
          <input type="text" ref="firstname"/>
      </div>

      <button onClick={event => {this.props.cancel()}}>Cancel</button>
      <button onClick={event => {this.send()}}>Sign Up</button>
    </div>;
  }
}

export default SignUp;