import React from 'react'

class FeedsPage extends React.Component {
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
        document.getElementById("TextBox").value="";
    }

    //Show
    componentDidMount(){
        this.show()
    }

    show(){
        if(this.props.id===0){ //if not logged in, show everyone's tweets
            this.props.api.get('/user/messages')
            .then(response => {
                this.setState({msgList: response.data});
            })
        }
        else{ //if logged in, show following's tweets
            this.props.api.get('/user/'+this.props.id) 
            .then(response => {
                this.setState({msgList: response.data});
            })
        }
    }

    //Delete
    delete = (id) => {
        console.log(id)
        this.props.api.delete('/user/'+this.props.id+'/messages',{ data: {"msg_id":id} }) 
            .then(response => {
                console.log(response);
                this.show()
        });
    }

    
    render(){
        console.log(this.state.msgList)
        return (<div  className = 'center'> 
            
            {this.props.id!==0 && <div className="PostBox">
                <textarea type="text" ref="post" id='TextBox'/>
                <button onClick={event => {this.send()}}>Post</button>
            </div>}

            <h2>Feeds</h2>
        {this.state.msgList.map((msg) => (
                <div className='msg'>
                    <img src="blathers.jpg"/> 
                    <div className='content'>
                        <div className='username'>{msg.user_id}</div>
                        <pre>{msg.text}</pre>
                        {this.props.id!==0 && this.props.id===msg.user_id && 
                        <button onClick={event => {this.delete(msg._id)}}>Delete</button>}
                    </div>
                </div>
            )
        )}
        </div>)
  }
}

export default FeedsPage;