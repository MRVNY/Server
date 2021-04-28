import React from 'react';

class ShowMsg extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            msgList: []
        }
    }

    componentDidMount(){
        this.show()
    }

    show(){
         this.props.api.get('/user/'+this.props.id+'/messages') 
            .then(response => {
                //this.out.innerHTML = "";
                //var msgList = response.data;
                this.setState({msgList: response.data});

                /*
                for(var i=0;i<this.msgList.length;i++){
                    this.out.innerHTML += `<msg>
                        <img src="blathers.jpg"/> 
                        <content>
                            <username>`+ this.msgList[i].user_id+`</username>
                            <label>`+ this.msgList[i].text+`</label>
                        </content>
                    </msg>`
                }
                console.log(this.out)
                */
                //return msgList
            }
        )
        //return msgList
    }

    
    render(){
        //this.show()
        console.log(this.state.msgList)
        return (<div  className = 'center'> 
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

export default ShowMsg;