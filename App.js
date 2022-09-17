import React from 'react';
import './App.css';


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { signInWithCredential } from 'firebase/auth';

firebase.initializeApp({
  // your config
  apiKey: "AIzaSyDpfJXQrN-_fsK4RcgVlIige5DuGpPwoH0",
  authDomain: "superchat-c593c.firebaseapp.com",
  projectId: "superchat-c593c",
  storageBucket: "superchat-c593c.appspot.com",
  messagingSenderId: "570286940334",
  appId: "1:570286940334:web:c2ea8d18623f27ff404d3f",
  measurementId: "G-NNE7ZEEV2K"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);

  }
  return(<button onClick={signInWithGoogle}>Sign in with Google</button>)
}


function SignOut(){
return auth.currentUser && (
  <button onClick={() => auth.signOut()}>SignOut</button>
)
}


function ChatRoom(){

const messagesRef = firestore.collection('messages');
const query = messagesRef.orderBy('createdAt').limit(25);

const [messages] = useCollectionData(query, {idField: 'id'});

return(
  <>
  
  <div>

   {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

  </div>

  <div>

    
  </div>
  
  </>
)
}

function ChatMessage(props){
  const {text, uid} = props.message;
  return <p>{text}</p>
}
export default App;
