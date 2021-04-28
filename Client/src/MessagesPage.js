import React from 'react'
import ManipMessages from './ManipMessages'

class MessagesPage extends React.Component {
  render() {
    return <div className = 'center'>
        <h2>Liste des messages</h2>
        <div id="tweets">
            <ManipMessages api={this.props.api} id={this.props.id}/>
        </div>
    </div>;
  }
}

export default MessagesPage;
