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
        document.getElementById("TextBox").value="";
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
            <div className="PostBox">
                <textarea type="text" ref="post" id='TextBox'/>
                <button onClick={event => {this.send()}}>Post</button>
            </div>
            
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

export default ManipMessages;
