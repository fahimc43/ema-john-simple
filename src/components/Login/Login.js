import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  

// if (!firebase.app.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const isSignedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(isSignedInUser);
        history.replace(from);
        // console.log(displayName, email, photoURL);
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }
  const handleSignedOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const isSignedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(isSignedOutUser);
      })
      .catch(error => {
        console.log(error);
      })
  }


  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }

  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name)

        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("sign in user info", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  }

  const updateUserName = name => {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log("User name update successfully");
    }).catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div style={{textAlign: "center"}}>
      {
        user.isSignedIn ? <button onClick={handleSignedOut}>Sign Out</button>
          : <button onClick={handleSignIn}>Sign in</button>
      }

      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>PassWord: {user.password}</p> */}
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your email address" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>User {newUser ? "Created" : "Logged in"} Successfully</p>}
    </div>
  );
}

export default Login;
