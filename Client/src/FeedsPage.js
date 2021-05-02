import React from 'react'

class FeedsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgList: []
        }
    }

    componentDidMount() {
        this.update()
    }

    //Post
    post(data) {
        const { post } = data
        this.props.api.put('/user/' + this.props.id + '/messages', { "text": post })
            .then(response => {
                console.log(response);
                this.update()
            }).catch(e => {
                alert(e);
            });
    }

    send(event) {
        var toSend = {
            post: this.refs.post.value,
        }
        this.post(toSend)
        document.getElementById("TextBox").value = "";
    }

    //update
    update() {
        if (this.props.id === 0) { //if not logged in, update everyone's tweets
            this.props.api.get('/user/messages')
                .then(response => {
                    console.log(response);
                    this.setState({ msgList: response.data });
                }).catch(e => {
                    alert(e);
                });
        }
        else { //if logged in, update following's tweets
            this.props.api.get('/user/' + this.props.id + '/feeds')
                .then(response => {
                    console.log(response);
                    this.setState({ msgList: response.data });
                }).catch(e => {
                    alert(e);
                });
        }
    }

    //Delete
    delete = (id) => {
        console.log(id)
        this.props.api.delete('/user/' + this.props.id + '/messages', { data: { "msg_id": id } })
            .then(response => {
                console.log(response);
                this.update()
            }).catch(e => {
                alert(e);
            });
    }

    render() {
        const { toProfile, id } = this.props
        return (<div className='center'>

            {id !== 0
                && <div className="PostBox">
                    <h2>What's On Your Mind?</h2>
                    <textarea type="text" ref="post" id='TextBox' />
                    <p><button onClick={event => { this.send() }}>Post</button></p>
                </div>}

            {id === 0 && <h2>What Everyone's Tweeting</h2>}
            {id !== 0 && <h2>Your Feed</h2>}
            {this.state.msgList.map((msg) => (
                <div className='msg' key={msg._id}>
                    <img src="blathers.jpg" alt="icon" />
                    <div className='content'>
                        <div className='top'>
                            <div className='username' onClick={event => { toProfile(msg.user_id) }}>@{msg.user_id}</div>
                            <div className='date'>{msg.date}</div>
                        </div>
                        <pre>{msg.text}</pre>
                        {id !== 0 && id === msg.user_id &&
                            <button onClick={event => { this.delete(msg._id) }}>Delete</button>}
                    </div>
                </div>
            )
            )}
        </div>)
    }
}

export default FeedsPage;