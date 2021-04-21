import React from 'react'

class MessagesPage extends React.Component {
  render() {
    return <div>
        <h2>Liste des messages</h2>
        <div id="tweets">
            <section class="msg">
                <img src="blathers.jpg"/> 
                <section class="user">
                    <username>Blathers</username>
                    <label>Hi, I'm Blathers.</label>
                </section>
            </section>

            <section class="msg">
                <img src="blathers.jpg"/> 
                <section class="user">
                <username>Blathers</username>
                <label>I hate bugs</label>
            </section>
            </section>
        </div>
    </div>;
  }
}

export default MessagesPage;