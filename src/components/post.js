import imageUser from '../img/nousuario.png';
import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase';
import Postdata from './dataPost' 
library.add(faPencilAlt)


const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
const db = firebase.firestore();

class Post extends Component { 
 
    constructor(props){
    super(props);
    
    this.handleChangePost = this.handleChangePost.bind(this);
 this.buttonPost = this.buttonPost.bind(this);
 
this.state={
  post:"",
  
}
}

    handleChangePost(e){
        const { value, name } = e.target;
      
        this.setState({
         [name]: value 
      
         
        }) 
      
      }


    buttonPost(){


        

        let image;
        if (this.props.user.providerData['0'].photoURL !== null) {
          image = this.props.user.providerData['0'].photoURL;
          document.getElementById("commentary").value="";
        } else {
          image = imageUser;
          document.getElementById("commentary").value="";
        }

       



        db.collection("users").add({
            name:this.props.user.displayName,
            post: this.state.post,
            uid: this.props.user.uid,
            photo: image,
            likes: 0
           
           
            
        })
        .then((docRef)=> {
            console.log("Document written with ID: ", docRef.id);
            //console.log(this.props.user.uid)
         
            

        
           
        })
        .catch((error)=>{
            console.error("Error adding document: ", error);
        });

   
    
 }


 
        
    render(){
return(

<div className="container-fluid">
<div className="card border mb-3"  id="card-social">
<div className="card-header" id="toPostName"></div>
<div className="card-body">
<div className="form-group text-left">
<label><b className="mr-1">{this.props.user.displayName}</b>escribe aqui tu comentario</label>
<textarea value={this.state.post} onChange={this.handleChangePost} name='post' className="form-control" id="commentary" />

<button  onClick={this.buttonPost} type="button" className="btn btn-raised btn-secondary btn-sm mt-3" id="button-topost">
  Publicar  <FontAwesomeIcon icon="pencil-alt" /></button>  
 
</div>
</div>
</div>

  <Postdata/>
</div>     

);



    }
}

export default Post;