import React from 'react'
import ManipFriends from './ManipFriends'

class FriendsPage extends React.Component {
  render() {
    const { api, id } = this.props;

    return <div className = 'center'>
        <h2>Feeds</h2>
        <div id="tweets">
            <ManipFriends api={api} id={id}/>
        </div>
    </div>;
  }
}

export default FriendsPage;