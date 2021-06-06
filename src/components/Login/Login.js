import React,{useContext, useRef, useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Form } from 'react-bootstrap';

import {  faFacebook, faFontAwesome} from '@fortawesome/free-brands-svg-icons'
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FaBeer,FaGoogle } from 'react-icons/fa';


firebase.initializeApp(firebaseConfig);


const Login = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const history=useHistory();
    const location=useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [createNewUser,setCreateNewUser]=useState(false)
    const [user,setUser]=useState({
        isSignedIn: false,
        name: "",
        email:"",
        password:"",
        error:"",
        success:false,
       
    })
    const nameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordconformRef=useRef();
   
  const handleGoogleSignIn=()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((res) => {
      const {displayName,email}=res.user;
      const signInUser={name:displayName,email:email}
      setLoggedInUser(signInUser)
      history.replace(from)
    // console.log(signInUser)
   
    // var credential = res.credential;

    // // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = credential.accessToken;
    // // The signed-in user info.
    // var user = result.user;
    // console.log(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  }


  const handleInputChange=(e)=>{
       console.log(e.target.name,e.target.value)
       let isFieldValid = true;
       if (e.target.name === 'email') {
         isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
       }
       if (e.target.name === 'password') {
         const isPasswordValid = e.target.value.length > 6;
         const passwordHasNumber = /\d{1}/.test(e.target.value);
         isFieldValid = isPasswordValid && passwordHasNumber;
       }
       if (isFieldValid) {
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
  
  }
  const handleSubmit=(e)=>{
      if(createNewUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from)
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
         
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log( errorCode,errorMessage)
          // ..
        });
      }

      if (!createNewUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          // .then((userCredential) => {
          //   // Signed in
          //   var user = userCredential.user;
          //   // ...
          // })
          .then(res => {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from)
           
          
            console.log('sign in user info',user)
          })
          .catch((error) => {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
            var errorCode = error.code;
         
          var errorMessage = error.message;
            console.log(errorCode, errorMessage)
          });
      }
    e.preventDefault();
  }
    return (
        <div  className="container  ">
           
            <h4 style={{color:"red"}}>{user.error}</h4>
            {
                user.success &&  <h4 style={{color:"green"}}>User {createNewUser ? "create" : "Sign in"} successfully</h4>
            }

            {
                createNewUser ?
                <Card className="w-50 mx-auto">
                <Card.Body>
                    <h2 className="text-center mb-4">Create Account</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name"> 
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" ref={nameRef} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group id="email"> 
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" ref={emailRef} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group id="password"> 
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"  name="password" ref={passwordRef} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group id="password-conform"> 
                            <Form.Label>Password Conform</Form.Label>
                            <Form.Control type="password" name="password-conform" ref={passwordconformRef} onChange={handleInputChange} required />
                        </Form.Group>
                        <Button type="submit" className="w-100">Create an account</Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Already you have an account? <span href="" onClick={()=>setCreateNewUser(!createNewUser)}>Log In</span>
    
                </div>
               
            </Card> :
            <Card className="w-50 mx-auto">
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                   
                    <Form.Group id="email"> 
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" ref={emailRef} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group id="password"> 
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} name="password" onChange={handleInputChange} required />
                    </Form.Group>
                    
                    <Button type="submit" className="w-100">Login</Button>
                </Form>
            </Card.Body>
            <div className="w-100 text-center mt-2">
               Don"t have an account? <Button className="w-100" > <span href="" onClick={()=>setCreateNewUser(!createNewUser)}> create an account</span></Button>

            </div>
           
        </Card>

            }
       
        
      
           <Form className="w-50 mx-auto">
            <h3 className="text-center">or</h3>
           
            <Button   className="w-100"  onClick={handleGoogleSignIn} ><FaGoogle/> Sign In With Google</Button>
            </Form>
         
         

   
            
        </div>
    );
};

export default Login;