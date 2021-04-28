import Head from 'next/head'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { db, auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '../../util/getRecipientsEmail'


function Chat({ chat, messages }) {
    const [user] = useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}  </title>
            </Head>
            <Sidebar style={{ width: "25vw" }} />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />

            </ChatContainer>

        </Container>
    )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);

    const messagesRef = await ref
        .collection('messages')
        .orderBy("timestamp", "asc")
        .get();

    const messages = messagesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    const chatRes = await ref.get();

    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    // console.log(chat, messages);

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }


}

const Container = styled.div`
display: flex;
`;

const ChatContainer = styled.div`

flex:1; 
overflow: scroll;
height: 100vh;
::-webkit-scrollbar {
    display:none;
}
-ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
`;
