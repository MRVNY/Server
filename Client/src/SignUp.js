import React from 'react';

class SignUp extends React.Component {  
    singup(data){
        const { login, password, lastname, firstname } = data

        this.props.api.put('/user',{"login":login, "password":password, "lastname":lastname, "firstname":firstname}) 
            .then(response => {
                console.log(response);
        }).catch(e => {
            alert(e);
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
        this.refs.login.value=""
        this.refs.password.value=""
        this.refs.firstname.value=""
        this.refs.lastname.value=""
    }
    
    render(){
    return <div>
        <div className = 'form'>
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
        </div>

      <button onClick={event => {this.props.cancel()}}>Cancel</button>
      <button onClick={event => {this.send()}}>Sign Up</button>
    </div>;
  }
}

export default SignUp;