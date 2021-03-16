import React, { useState } from 'react';
import './App.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



function App() {
  const [user, setUser] = useState({});
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user)
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage);
      });
    }

    const handleFbSignIn = () => {
      firebase.auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage)
      });
  }

  const handleGithubSignIn =() =>{
    firebase
  .auth()
  .signInWithPopup(ghProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user)
    console.log(user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in With google</button>
      <br/>
      <button onClick={handleFbSignIn}>Sign in with fb</button>
      <br/>
      <button onClick={handleGithubSignIn}>Sign in with Github</button>
      <br/>
      <h1>Name: {user.displayName}</h1>
      <h3>email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
      
    </div>
  );
}

export default App;
