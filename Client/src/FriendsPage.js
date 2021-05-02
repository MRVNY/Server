import React from 'react'

class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: [],
            followings: []
        }
    }

    //update
    componentDidMount(){
        this.update()
    }

    update(){
        this.props.api.get('/user/'+this.props.id+'/followers') 
        .then(response => {
            console.log(response)
            this.setState({followers: response.data});
        }).catch(e => {
            alert(e);
        });

        this.props.api.get('/user/'+this.props.id+'/followings') 
        .then(response => {
            console.log(response)
            this.setState({followings: response.data});
        }).catch(e => {
            alert(e);
        });
    }
    
    render(){
        return (<div  className = 'twoCol'> 
        <div className='col'>
        <h1>Followers</h1>
        {this.state.followers.map((user) => (
                <div className='userBox' key={user.user}>
                    <img src="blathers.jpg" alt="icon"/>
                    <div className='content'>
                        <div className='bigName' onClick={event => {this.props.toProfile(user.user)}}>@{user.user}</div>
                    </div>
                </div>
            )
        )}
        </div>

        <div className='col'>
        <h1>Followings</h1>
        {this.state.followings.map((user) => (
                <div className='userBox' key={user.following}>
                    <img src="blathers.jpg" alt="icon"/>
                    <div className='content'>
                        <div className='bigName' onClick={event => {this.props.toProfile(user.following)}}>@{user.following}</div>
                    </div>
                </div>
            )
        )}
        </div>
        </div>)
  }
}

export default FriendsPage;