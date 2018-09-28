import React, { Component } from 'react';
import firebase from 'firebase';
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
    <p>{item.name}</p>
    <p>{item.post}</p>
    <img  width="100" src={item.photo} alt={item.name} />

    </div>
))}
   
   
    
    </div>
);

}


}



export default Postdata;