import React, { Component } from 'react';
import firebaseApp from './config/firebase';
import Login from './components/login';
import Home from './components/home';
import './App.css'; 


class App extends Component {

  constructor(){

    super();
    this.state = {
  user:{},
    }
  }
    
componentDidMount(){

  this.authListener();
}

  authListener(){
/* Por medio de esta función se verifica el estado del usuario para saber si 
existe un registro de este en la base de datos de firebase */
  firebaseApp.auth().onAuthStateChanged((user) =>{

    
    if (user) {
      // User is signed in.
      this.setState({user});
      console.log(this.state.user.displayName)
      console.log(this.state.user.providerData['0'].photoURL)
      //console.log(this.state.user.photoURL)


     

    } else {
      // No user is signed in.
      this.setState({user: null });

    }
  });
}


  render() {
    return (
      <div className="App">

        
       
          {this.state.user ? (<Home user={ this.state.user}/>) :(<Login />)}
     
      </div>
    );
  }
}

export default App;

