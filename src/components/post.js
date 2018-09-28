import React, { Component } from 'react';
import firebase from 'firebase';
import Postdata from './dataPost' 
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
        } else {
          image = '../img/nousuario.png';
        }

console.log(this.state.post);

        db.collection("users").add({
            name:this.props.user.displayName,
            post: this.state.post,
            uid: this.props.user.uid,
            photo: image
            
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
<div className="card border-light mb-3"  id="card-social">
<div className="card-header" id="toPostName"></div>
<div className="card-body">
<div className="form-group">
<label >Escribe aqui tu comentario</label>
<textarea value={this.state.post} onChange={this.handleChangePost} name='post' className="form-control" id="commentary" rows="1"></textarea>

<button  onClick={this.buttonPost} type="button" className="btn btn-raised btn-secondary btn-sm" id="button-topost">
  Publicar  <i className="fas fa-arrow-circle-right"></i></button>  
 
  <Postdata/>
</div>
</div>
</div>

</div>     

);



    }
}

export default Post;