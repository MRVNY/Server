import React from 'react';

class ManipMessages extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            msgList: []
        }
    }

    //Post
    post(data){
        const { post } = data
        this.props.api.put('/user/'+this.props.id+'/messages',{"text":post}) 
            .then(response => {
                console.log(response);
                this.show()
        });
    }

    send(event){
        var toSend = {
            post : this.refs.post.value,
        }
        this.post(toSend)
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
            <div className="PostBox">
                <input type="text" ref="post"/>
                <button onClick={event => {this.send()}}>Post</button>
            </div>
            
        {this.state.msgList.map((msg) => (
                <div className='msg'>
                    <img src="blathers.jpg"/> 
                    <div className='content'>
                        <div className='username'>{msg.user_id}</div>
                        <label>{msg.text}</label>
                    </div>
                </div>
            )
        )}
        </div>)
  }
}

export default ManipMessages;
