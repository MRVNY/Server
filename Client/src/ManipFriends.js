import React from 'react';

class ManipFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: [],
            followings: []
        }
    }

    //Show
    componentDidMount(){
        this.show()
    }

    show(){
         this.props.api.get('/user/'+this.props.id+'/messages') 
            .then(response => {
                this.setState({msgList: response.data});
            }
        )
    }
    
    render(){
        console.log(this.state.msgList)
        return (<div  className = 'center'> 
            
        {this.state.msgList.map((msg) => (
                <div className='msg'>
                    <img src="blathers.jpg"/> 
                    <div className='content'>
                        <div className='username'>{msg.user_id}</div>
                        <pre>{msg.text}</pre>
                        <button onClick={event => {this.delete(msg._id)}}>Delete</button>
                    </div>
                </div>
            )
        )}
        </div>)
  }
}

export default ManipFriends;
