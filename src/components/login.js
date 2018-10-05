import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseApp from '../config/firebase';
import '../Login.css';

//Creando clase 

class Login extends Component { 
 
    constructor (){
        super();
        
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginGoogle = this.loginGoogle.bind(this);
        this.createUser = this.createUser.bind(this);
        
        //Se almacenan valores en variables de estado 
this.state ={
email:"",
password:"",
name:"",
registryEmail:"",
registryPassword:""


}
    }

// Ingresa el usuario
/* Cuando el usuario ya ha hecho su registro anteriormente solo debe ingresar su
correo y contraseña */

login(e){
e.preventDefault();
firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
}).catch((error)=>{
    
console.log(error);
});    

}

createUser(e){
    e.preventDefault();

  

firebase.auth().createUserWithEmailAndPassword(this.state.registryEmail, this.state.registryPassword)
    
.then(() => {
  
    alert('Your account has been created');
    const nameUser = this.state.name;
    console.log(nameUser);

    
    var user = firebase.auth().currentUser;
//Actualizando nombre de usuario 
    user.updateProfile({
      displayName: this.state.name
      
    })





  })



.catch((error)=> {
// Handle Errors here.
let errorCode = error.code;
let errorMessage = error.message;
if (errorCode === 'auth/weak-password') {
alert('The password is too weak.');
} else {
alert(errorMessage);
}
console.log(error);
});


}


loginFacebook(){
  const provider = new firebase.auth.FacebookAuthProvider();

  firebaseApp.auth().signInWithPopup(provider)
  .then()
  .then(result => console.log(`${result.user.email} ha iniciado sesión`))
  .catch(error => console.log(`Error ${error.code}: ${error.message}`));

}


loginGoogle(){

  const provider = new firebase.auth.GoogleAuthProvider();
  firebaseApp.auth().signInWithPopup(provider)
  .then()
  .then(result => console.log(`${result.user.email} ha iniciado sesión`))
  .catch(error => console.log(`Error ${error.code}: ${error.message}`));
}






handleChange(e){
    const { value, name } = e.target;

   this.setState({
    [name]: value 

  }) 

  

}

render() {


    return (
        <div className="Login">


<nav className="navbar navbar-expand-lg navbar-light mt-1">
  <a  id="titule" className="navbar-brand mt-2 mb-3" >DEAFRIEND</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">
    <ul className="navbar-nav ">
    
{/*  Botones LoginGoogle y LoginFacebook*/} 
<span  onClick={this.loginFacebook}  className="badge badge-pill badge-primary pt-2 mr-2 mb-3 mt-2 col-sm-1" >F</span>
<span onClick={this.loginGoogle}  className="badge badge-pill badge-danger pt-2 mr-2 mb-3 mt-2 col-sm-1" >G</span>

{/*  Inputs Email y Password*/}
    <input 
            value={this.state.email}
            onChange={this.handleChange}
                type="email"
                name='email'
                className="form-control mr-2 mb-2" 
                placeholder="Email"
                id="inputEmail"
                />



                <input  
            value={this.state.password}
            onChange={this.handleChange}
                type="password"
                name='password'
                className="form-control mr-2 mb-2" 
                placeholder="Password"
                id="inputPassword"
                />

 {/*  Botones Login y Signup*/} 
   <button type="submit" onClick={this.login}  className="btn btn-dark mr-2 mb-3" >Login</button>
   <button className="btn btn-outline-dark mb-3 ml-3 mr-3" data-toggle="modal" data-target="#exampleModal">
            Signup
        </button> 
    
        
      </ul>
  </div>
</nav>

<div id="background">
</div>



    



{/*Modal*/} 

<div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Create an account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          

                    <div className="row">
                           
                                  <input type="text" className="form-control registry-btn mr-4 ml-4 mt-2 mb-2" placeholder="Nombre" id="registryName"   name='name'  value={this.state.name} onChange={this.handleChange} /> 
                      
                                   <input type="email" className="form-control registry-btn mr-4  mr-4 ml-4 mt-2 mb-2"   placeholder="Correo" id="registryEmail" name='registryEmail' value={this.state.registryEmail} onChange={this.handleChange}/>
                            
                                   <input type="password" className="form-control registry-btn mr-4 mr-4 ml-4 mt-2 mb-2"  placeholder="Contraseña" id="registryPassword" name='registryPassword' value={this.state.registryPassword} onChange={this.handleChange}/>
                          
                          </div>
    
                    
            
            <div className="modal-footer">
              <button type="button" onClick={this.createUser} className="btn btn-dark" id="Registrar">Send</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              
             
            </div>
          </div>
        </div>
      </div>



    </div>


        
        
        );
        



 
}


}
export default Login;