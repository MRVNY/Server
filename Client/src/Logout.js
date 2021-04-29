import React from 'react'

class Logout extends React.Component {
    logout(){
        this.props.api.delete('/user/'+this.props.id) 
            .then(response => {
                console.log(response);
                if(response) this.props.logout();
        });
    }

    render(){
        return <button onClick={event => {this.logout()}}>Logout</button>
    }
}

export default Logout;
