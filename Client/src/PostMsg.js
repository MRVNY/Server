import React from 'react';

class PostMsg extends React.Component {    
    post(data){
        const { post } = data
        this.props.api.put('/user/'+this.props.id+'/messages',{"text":post}) 
            .then(response => {
                console.log(response);
        });
    }

    send(event){
        var toSend = {
            post : this.refs.post.value,
        }
        this.post(toSend)
    }
    
    render(){
    return <div className="PostBox">
          <input type="text" ref="post"/>
      
      <button onClick={event => {this.send()}}>Post</button>
    </div>;
  }
}

export default PostMsg;
