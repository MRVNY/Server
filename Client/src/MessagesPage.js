import React from 'react'
import ManipMessages from './ManipMessages'

class MessagesPage extends React.Component {
  render() {
    const { api, id } = this.props;

    return <div className = 'center'>
        <h2>Liste des messages</h2>
        <div id="tweets">
            <ManipMessages api={api} id={id}/>
        </div>
    </div>;
  }
}

export default MessagesPage;
