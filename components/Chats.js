import styled from "styled-components"
import { Avatar, Button, IconButton } from '@material-ui/core'
import getRecipienEmail from '../util/getRecipientsEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function Chats({ id, users }) {

    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipienSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipienEmail(users, user))
    );


    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipent = recipienSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipienEmail(users, user);

    return (
        <Container onClick={enterChat}>
            {recipent ? (
                <Useravatar src={recipent?.photoURL} />
            ) : (
                    <Useravatar > {recipientEmail[0]} </Useravatar>
                )}

            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chats

const Container = styled.div`
cursor: pointer;
display:flex;
align-items: center;
padding:10px;
word-break:break-word;
:hover {
    background-color:#e9eaeb;
     
 }
`;

const Useravatar = styled(Avatar)`
 cursor: pointer;
 margin:5px;
 margin-right:15px;

:hover {
     opacity: 0.8;
     
 }
 `;
