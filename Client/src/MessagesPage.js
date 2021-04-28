import React from 'react'
import ShowMsg from './ShowMsg'
import PostMsg from './PostMsg'

class MessagesPage extends React.Component {
  render() {
    return <div className = 'center'>
        <h2>Liste des messages</h2>
        <div id="tweets">
            <PostMsg api={this.props.api} id={this.props.id}/>

            <h2>Messages:</h2>
            <ShowMsg api={this.props.api} id={this.props.id}/>
        </div>
    </div>;
  }
}

export default MessagesPage;