//1.1

import React, { Component } from 'react';


class Card extends Component{
    constructor(props){
        super(props);
    }
    render(){
        <div className="Cards">props.symbol</div>
    }
}

//1.2
//props contient les attributs que l'on va recuperer dans  la creation de la Carte

//1.3

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {display : props.display} // creation etat carte
    }
    render(){
        <div className="Cards">props.symbol</div>
    }
}


//1.4

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {display : props.display} // creation etat carte
    }
    render(){
        <div className="Cards">{this.state.display === 'visible' ? this.props.symbol : '-' } </div>
    }
}

//1.5

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {display : props.display} // creation etat carte
    }

    onClickCard(){
        if (this.state.display === 'hidden'){
            this.setState({display: 'visible'});
        }

    }

    render(){
        return <div className="Cards"  onClick= {() => this.onClickCard()}> {this.state.display === 'visible' ? this.props.symbol : '-' } </div>
    }
}



//2.1


class Cardlist extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className = "Cardlist">
            <Card symbol="toto" display="visible"/>   
            <Card symbol="tata" display="hidden"/>   
            <Card symbol="titi" display="visible"/> 
            </div>

    }
}


//2.2

class Cardlist extends Component{
    constructor(props){
        super(props);
        this.state = { cartes: [
            {id:1 , card:"toto", display:'visible'},
            {id:7 , card:"tata", display:'hidden'},
            {id:3 , card:"titi", display:'visible'}
        ] };

    }

    //affichage
    render(){
        return <div className = "Cardlist">
            {
                this.state.cartes.map((card,index) => (
                    <Card symbol ={card.card} display={card.display} />
                ))
            }

            </div>

    }
}





//2.3
// A la fin du fichier js
ReactDOM.render(<Cardlist/>  ,  document.getElementById('root'));

//3.1

class FormAddCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className ="FormAddCard">
                <label>Symbol</label> <input type="text"/>
                <label> Visibilite </label>
                <select>
                    <option value="visible"> Visible </option>
                    <option value="hidden"> Hidden </option>
                </select>
                <input type="submit" value = "Submit"/>
            </div>
        )

}
}


//3.2

class PageCard extends Component{
    render(){
        return(
            <div>
                <FormAddCard/>
                <Cardlist/>
            </div>
        )
    }
    }


//3.3

class FormAddCard extends Component{
    constructor(props){
        super(props);
    }

    // recuperation valeur form
    send(event){
        var data_to_send = {
            card : this.ref.card.value,
            display : this.ref.display.value
        }

       this.props.addCard(data_to_send) // creation nouvelle card et ajout dans la liste state.cartes du pere
    }

    render(){
        return(
            <div className ="FormAddCard">
                <label>Symbol</label> <input ref="card" type="text"/>
                <label> Visibilite </label>
                <select ref="display" >
                    <option value="visible"> Visible </option>
                    <option value="hidden"> Hidden </option>
                </select>
                <button className="button" onClick={(event => this.send())} > Create Card </button>
            </div>
        )

}
}



class PageCard extends Component{
    constructor(props){
        super(props);
        
            this.state = { cartes: [
                {id:1 , card:"toto", display:'visible'},
                {id:2 , card:"tata", display:'hidden'},
                {id:3 , card:"titi", display:'visible'}
            ] };

            this.addCard = this.addCard.bind(this)
        
    }

    addCard(card){
        card["id"] = this.state.cartes.length + 1
        this.setState((state)=> {
        state.cartes = state.cartes.concat(card);
        return state;
    })


    }


    render(){
        return(
            <div>
                <FormAddCard addCard={this.addCard}/> 
                <Cardlist cards = {this.state.cartes} /> 
            </div>
        )
    }
    }



  //modification constructeur CardList
class Cardlist extends Component{
    constructor(props){
        super(props);
        this.state = props.cards
    }


//4.1
//Composant: Formulaire, login, logout
//Mainpage pour faire  le switch entre les diff pages

//4.2
//Composant Message, Liste Message, barre de recherche

//4.3
//Composants Message, Listmessage, Amis, List Amis, barre de recherche

//4.4
    //Page dans notre index.js appele les differentes pages en fonction de valeur dans state: 
    // this.state.connect = False/True

    //si connect = False => page de connexion
    //si connect = True => page principale (tweets)