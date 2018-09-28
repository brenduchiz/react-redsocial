import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCWNeW18ygRT6y9hojMZc0SJt0wFQKLAcQ",
    authDomain: "red-social-react-6f708.firebaseapp.com",
    databaseURL: "https://red-social-react-6f708.firebaseio.com",
    projectId: "red-social-react-6f708",
    storageBucket: "red-social-react-6f708.appspot.com",
    messagingSenderId: "932923770560"
  };
 const firebaseApp = firebase.initializeApp(config);



export default  firebaseApp;
