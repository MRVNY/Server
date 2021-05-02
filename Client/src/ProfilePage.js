import React from 'react'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            msgList: [],
            isFollowing: false,
            followers: 0,
            followings: 0
        }
    }

    //update
    componentDidMount(){
        this.update()
    }

    async update(){
        const {id, profileID} = this.props
        await this.props.api.get('/user/'+profileID+'/messages') 
        .then(response => {
            console.log(response);
            this.setState({msgList: response.data});
        }).catch(e => {
            alert(e);
        });

        await this.props.api.get("/user/"+profileID)
        .then(response => {
            console.log(response);
            this.setState({userInfo: response.data})
        }).catch(e => {
            alert(e);
        });

        await this.count()
        if(id!==profileID && id!==0) await this.check()
    }

    //Check if following
    async check(){
        const toCheck = this.props.profileID
        await this.props.api.get('/user/'+this.props.id+'/followings/'+toCheck)
        .then(response => {
            console.log(response);
            this.setState({isFollowing: (response.data)})
        }).catch(e => {
            alert(e);
        });
    }

    //DeleteMsg
    delete = (id) => {
        console.log(id)
        this.props.api.delete('/user/'+this.props.profileID+'/messages',{ data: {"msg_id":id} }) 
            .then(response => {
                console.log(response);
                this.update()
        }).catch(e => {
            alert(e);
        });
    }

    //Follow
    follow(event){
        this.props.api.put('/user/'+this.props.id+'/follow',{ "followingID":this.props.profileID}) 
            .then(response => {
                console.log(response);
                this.update()
        }).catch(e => {
            alert(e);
        });
    }

    //UnFollow
    unfollow(event){
        this.props.api.delete('/user/'+this.props.id+'/follow',{ data: {"followingID":this.props.profileID} }) 
            .then(response => {
                console.log(response);
                this.update()
        }).catch(e => {
            alert(e);
        });
    }

    //Count followers & followings
    async count(){
        await this.props.api.get('/user/'+this.props.profileID+'/followers') 
        .then(response => {
            console.log(response)
            const tmp = response.data.length
            this.setState({followers: tmp});
        }).catch(e => {
            alert(e);
        });

        await this.props.api.get('/user/'+this.props.profileID+'/followings') 
        .then(response => {
            console.log(response)
            this.setState({followings: response.data.length});
        }).catch(e => {
            alert(e);
        });
    }

    render(){
        const {id, profileID, toProfile, toFriends,toLogin} = this.props

        return (<div  className = 'center'> 

        <div className='profile'>
            <img src="blathers.jpg" alt="icon" className='profilePic' /> 
            <h2>{this.state.userInfo.firstname} {this.state.userInfo.lastname}</h2>
            <p>@{this.state.userInfo.login}</p>
            <p>

            {id===0 && <button onClick={event => {toLogin()}}>Login to follow</button>}
            {id!==0 && profileID!==0 && profileID!==id && this.state.isFollowing && <button onClick={event => {this.unfollow()}}>Unfollow</button>}
            {id!==0 && profileID!==0 && profileID!==id && !this.state.isFollowing && <button onClick={event => {this.follow()}}>Follow</button>}
            {id!==0 && id===profileID && <p className="link" onClick={event => {toFriends()}} >
                Followers:{this.state.followers} Followings:{this.state.followings} </p> }
            {id!==profileID && <p className="link" >
                Followers:{this.state.followers} Followings:{this.state.followings} </p> }
                </p>
        </div>

        <h2>Tweets</h2>
        {this.state.msgList.map((msg) => (
                <div className='msg' key={msg._id}>
                    <img src="blathers.jpg" alt="icon"/> 
                    <div className='content'>
                    <div className='top'>
                        <div className='username' onClick={event => {toProfile(msg.user_id)}}>@{msg.user_id}</div>
                        <div className='date'>{msg.date}</div>
                    </div>
                        <pre>{msg.text}</pre>
                        {id!==0 && id===profileID && <div className='delete' onClick={event => {this.delete(msg._id)}}>Delete</div>}
                    </div>
                </div>
            )
        )}
        </div>)
  }
}

export default ProfilePage;
