import styled from 'styled-components'
import Head from 'next/head'
import { Button, } from '@material-ui/core';
import { auth, provider } from '../firebase';
import firebase from 'firebase'
import { useEffect, useState } from 'react'


function Login() {

    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signIn = () => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });

    }

    return (
        <Container>

            <Head>
                <title>login</title>
            </Head>

            <LoginContainer>
                <Logo src="/logo.png" />
                <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your email "
                />
                <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />

                <Button onClick={signIn} variant="outline" style={{ alignItems: "center" }}>Login</Button>

            </LoginContainer>

        </Container>
    )
}

export default Login

const Container = styled.div`
display:grid;
place-items:center;
height: 100vh;
background-color:whitesmoke;
`;

const Input = styled.input`
 width: 90%;
background-color:whitesmoke;
height: 40px;
border-radius:18px;
border:none;
margin:12px;
padding: 10px;
padding-left:24px;
`;

const LoginContainer = styled.div`
display:flex;
flex-direction: column;
padding:100px;
align-items:center;
background-color:white;
border-radius: 20px;
box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7)
`;

const Logo = styled.img`
 height:200px;
 width:240px;
 margin-bottom:20px;
`