//import logo from './logo.svg';
import './App.css';


import React from 'react';
import axios from 'axios';

class App extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
	const api = axios.create({
	baseURL : '/api/',
	timeout : 1000,
	headers : {'X-Custom-Header' : 'foobar'}
	});
	api.post('/user',{"login":"fdfsdfdsfdsfds","password":"1234", "lastname":"chu", "firstname":"pika"},) 
            .then(response => {
                console.log(response); // à tester la première fois pour voir ce que retourne le serveur
            });
    }
    
    render(){
        return(
        <div className="Cardlist">
            ok
        </div>
        )
    }
}


export default App;
