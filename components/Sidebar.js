import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Chat from '@material-ui/icons/chat'
import SearchIcon from '@material-ui/icons/search'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chats from './Chats'

function Sidebar() {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt(
            "please enter an email address for the user"
        );

        if (!input) return null;

        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            // wehhn kplkjl pkihjk h
            db.collection('chats').add({
                users: [user.email, input]
            });
        }
    }

    const chatAlreadyExists = (recipientEmail) => {
        chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0)
    }
    return (
        <Container>
            <Header>
                <Useravatar src={user.photoURL} onClick={() => auth.signOut()} />

                <IconsContainer>
                    <IconButton onClick={createChat}>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchB>
                    <SearchIcon />
                    <SearchInput placeholder='Search in chats' />
                </SearchB>

            </Search>

            {/*chat list*/}

            {chatsSnapshot?.docs.map(chat => (
                <Chats key={chat.id} id={chat.id} users={chat.data().users} />
            ))}

        </Container>
    )

}

export default Sidebar

const Container = styled.div`
border-right:1px solid whitesmoke;
width: 25vw;
flex:0.45;
height: 100vh;
overflow: scroll;
::-webkit-scrollbar {
    display:none;
}
-ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */


`;

const SideButton = styled(Button)`
  width: 100%;
  &&&{
      border-top:1px solid whitesmoke;
      border-bottom:1px solid whitesmoke
  }
`;

const Header = styled.div`
display:flex;
position:sticky;
top: 0;
background-color:#f3f0f5;
z-index:1;
justify-content:space-between;
align-items:center;
padding:15px;
height:80px;
border-bottom:1px solid whitesmoke;
border-right:0.9px solid #eae6ed
`
    ;
const IconsContainer = styled.div``;
const Useravatar = styled(Avatar)`
 cursor: pointer;

 :hover {
     opacity: 0.8;
     
 }
 `;

const SearchB = styled.div`

border-radius:22px;
background-color:white;
display: flex;
align-items:center;
padding:6px;
padding-left:16px;

`;

const Search = styled.div`

background-color:#fcfcfc;
padding:12px;
`;

const SearchInput = styled.input`
outline-width:0;
outline:none;
border:none;
flex:1;
padding:12px;

`;

