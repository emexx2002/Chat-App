import React from 'react';
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth, } from '../firebase'
import { useRouter } from 'next/router'
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, Mic } from '@material-ui/icons';
import { useCollection } from 'react-firebase-hooks/firestore'
import { useEffect, useState, useRef } from 'react'
import firebase from 'firebase'
import Message from './Message'
import getRecipientEmail from '../util/getRecipientsEmail';
import TimeAgo from 'timeago-react';
import InputEmoji from "react-input-emoji";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AddIcon from '@material-ui/icons/Add';

function ChatScreen({ chat, messages }) {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [user] = useAuthState(auth);
    const endOfMessageRef = useRef(null)
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");


    const [recipientSnapshot] = useCollection(
        db
            .collection("users")
            .where("email", "==", getRecipientEmail(chat.users, user))
    );


    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    );

    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    function handleOnEnter(text) {
        console.log("enter", text);
        // e.preventDefault();
        //update last seen
        db.collection("users").doc(user.id).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        db.collection("chats").doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: text,
            user: user.email,
            photoUrl: user.photoURL,
        });

        setInput("");
        scrollToBottom();
    }

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    /*  function handleUpload(e) {
          e.preventDefault();
          const uploadTask = storage.ref(`/images/${file.name}`).put(file);
          uploadTask.on("state_changed", console.log, () => {
              storage
                  .ref("images")
                  .child(file.name)
                  .getDownloadURL()
                  .then((url) => {
                      setFile(null);
                      setURL(url);
                  });
  
              db.collection("users").doc(user.id).set({
                  lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
              }, { merge: true });
  
              db.collection("chats").doc(router.query.id).collection('messages').add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  message: url,
                  user: user.email,
                  photoUrl: user.photoURL,
              });
  
              setInput("");
              scrollToBottom();
          });
      }*/



    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (

                <Message key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }} />
            ))
        } else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id}
                    user={message.user}
                    message={message} />
            ))
        }
    }

    /* const sendMessage = (e) => {
         e.preventDefault();
         //update last seen
         db.collection("users").doc(user.id).set({
             lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
         }, { merge: true });
 
         db.collection("chats").doc(router.query.id).collection('messages').add({
             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
             message: input,
             user: user.email,
             photoUrl: user.photoURL,
         });
 
         setInput("");
         scrollToBottom();
 
     }*/

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };





    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar > {recipientEmail[0]} </Avatar>
                )}


                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>last active:{" "}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ) : (
                                "unavailable"
                            )}
                        </p>
                    ) : (
                        <p> Loading lastSeen</p>
                    )}

                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFile aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><PhotoCameraIcon /></MenuItem>
                        <MenuItem onClick={handleClose}>
                            <div>
                                <form >
                                    <label htmlFor="myInput"><AddIcon /></label>
                                    <input
                                        id="myInput"
                                        style={{ display: 'none' }}
                                        type={"file"}
                                        onChange={handleChange}

                                    />
                                    <button disabled={!file}>upload to firebase</button>
                                </form>
                            </div>

                        </MenuItem>
                    </Menu>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}

                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>
            <InputContainer>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                    cleanOnEnter
                />
                <Mic style={{ marginRight: " 9px" }} />
            </InputContainer>

            {/* <InputContainer>
                <InsertEmoticon style={{ marginLeft: " 9px" }} />
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="send a message" />
                <button hidden disabled={!input} type="submit" onClick={sendMessage} >send message</button>
                <Mic style={{ marginRight: " 9px" }} />
            </InputContainer>*/}

        </Container>
    )
}

export default ChatScreen;

const Container = styled.div`

`;

const Input = styled.input`
 flex:1;
 align-items: center;
 padding:12px;
 position: sticky;
 background-color:whitesmoke;
 border:none;
 border-radius:18px;
 outline:none;
 margin-left:10px;
 margin-right:10px;

`;

const InputContainer = styled.div`
display: flex;
align-items: center;
padding:10px;
position: sticky;
bottom: 0;
background-color:white;
z-index:100;
`;



const MessageContainer = styled.div`
background: url("/backg.png");
background-color:whitesmoke;
padding: 30px;
min-height:90vh;
background-size: cover;
background-repeat: no-repeat;
background-position:fixed;

`;

const Header = styled.div`
position: sticky;
background-color:#f3f0f5;
z-index: 100;
top: 0;
display: flex;
padding:11px;
height:80px;
align-items: center;
border-bottom: 1px solid whitesmoke;
`;
const HeaderIcons = styled.div`

`;
const EndOfMessage = styled.div`
margin-bottom:50px;

`;
const HeaderInformation = styled.div`
margin-left: 15px;
flex:1;

> h3 {
    margin-bottom:3px
}

>p {
    font-size:14px;
    color: grey;
}

`;

const Lol = styled.div`
display: flex;
`

