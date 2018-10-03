import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt,faUserEdit, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase';
import '../dataPost.css'
library.add(faTrashAlt,faUserEdit,faThumbsUp,faThumbsDown)

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
const db = firebase.firestore();

 class Postdata extends Component{ 


    constructor(){
        super();
this.removePost = this.removePost.bind(this);
this.editPost = this.editPost.bind(this);
        this.state = ({
            posts : []
          }) 


    }

    componentDidMount(){
 
        db.collection("users").onSnapshot((querySnapshot) => {
            const posts = [];
           querySnapshot.forEach((doc) => {
               console.log(`${doc.id} => ${doc.data()}`);
       
               const {name,photo,post } = doc.data();

               posts.push({
                
                name, 
                photo,
                post,
                id:doc.id
               
              });

           console.log(doc.id)
          
           });
       
           this.setState({
                 
            posts
          
    
        });
       
       
       });
     
    }


//Borrar post

removePost(id){

    db.collection("users").doc(id).delete().then(()=> {

        console.log("Document successfully deleted!");
        
    }).catch((error)=> {
        console.error("Error removing document: ", error);
    });  
    
}

//Editar docuemnto 


editPost(id){

document.getElementById(id).readOnly = false;


let buttonUpdate = document.getElementById("edit" + id);

   buttonUpdate.innerHTML = "Guardar" 

buttonUpdate.onclick = ()=> {
const textRead = document.getElementById(id).value;
console.log(textRead)
const washingtonRef = db.collection("users").doc(id);

   
    return washingtonRef.update({
        post: textRead
    })
    .then(()=> {
        console.log("Document successfully updated!");
       
        document.getElementById(id).readOnly = true;
         buttonUpdate.innerHTML = 'Editar';
    })
    .catch((error)=> {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

}
    }
    


    
render(){
    const{posts}=this.state;
return(  

    
    <div>
    {posts.map((item) => (
    
    
    <div key={item.id}>



<div className="card mb-3 mt-5" id="cardPost">
            <div className="card-header text-left">
            <img  width="30"className="img-fluid z-depth-1 rounded-circle " src={item.photo} alt={item.name} /><span className="ml-2">{item.name}</span>
           </div>  
            

 <div className="card-body mb-3">
            <textarea id={item.id} className="form-control text-sm-left" readOnly >{item.post}</textarea>
              <div className="rounded-bottom mdb-c olor lighten-3 text-right pt-3">
                <ul className="list-unstyled list-inline font-small" >  
                  <li className="list-inline-item pr-1 grey-text">date</li>
                  <li className="list-inline-item pr-2"><a className="white-text"  id ={"edit" + item.id}  onClick={() => this.editPost(item.id)} ><FontAwesomeIcon icon="user-edit" />Editar</a></li>
                  <li className="list-inline-item pr-2"><a className="white-text" id ='remove{item.id}' onClick={() => this.removePost(item.id)}  ><FontAwesomeIcon icon="trash-alt" />Eliminar</a></li>
                  <li className="list-inline-item pr-2"><a className="white-text"><FontAwesomeIcon icon="thumbs-up" />Me gusta</a></li>
                  <li className="list-inline-item pr-2"><a className="white-text"><FontAwesomeIcon icon="thumbs-down" />No me gusta</a></li>
                </ul> 
              </div>
            </div>
            </div>





   
    </div>
))}
   
   
    
    </div>
);

}


}



export default Postdata;