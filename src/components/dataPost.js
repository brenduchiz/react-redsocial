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

        this.state = ({
            posts : []
          }) 



    }

    componentDidMount(){
 
        db.collection("users").get().then((querySnapshot) => {
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
           console.log(posts)
           });
       
           this.setState({
                 
            posts
          
    
        });
       
       
       });
     
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
            

 <div class="card-body mb-3">
            <textarea class="form-control text-sm-left" readOnly rows="1">{item.post}</textarea>
              <div className="rounded-bottom mdb-c olor lighten-3 text-right pt-3">
                <ul className="list-unstyled list-inline font-small" >
                  <li className="list-inline-item pr-1 grey-text">date</li>
                  <li class="list-inline-item pr-2"><a class="white-text"><FontAwesomeIcon icon="user-edit" />Editar</a></li>
                  <li class="list-inline-item pr-2"><a class="white-text"><FontAwesomeIcon icon="trash-alt" />Eliminar</a></li>
                  <li class="list-inline-item pr-2"><a class="white-text"><FontAwesomeIcon icon="thumbs-up" />Me gusta</a></li>
                  <li class="list-inline-item pr-2"><a class="white-text"><FontAwesomeIcon icon="thumbs-down" />No me gusta</a></li>
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