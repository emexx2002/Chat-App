import styled from 'styled-components'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import moment from 'moment'

function Message({ user, message }) {

    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    const TypeOfMessage2 = user === userLoggedIn.email ? Sender1 : Receiver1;

    return (
        <Container>{isValidURL(message.message) === true ? <TypeOfMessage2 src={message.message}>


        </TypeOfMessage2> : <TypeOfMessage> {message.message}
            <Timestamp>{message.timestamp ? moment(message.timestamp).format('LT') : "..."}</Timestamp>

        </TypeOfMessage>
        }


        </Container>
    )
}

export default Message

const Container = styled.div``;

const MessageElement = styled.p`
width: fit-content;
padding:10px;
margin:10px;
min-width:80px;
padding-bottom:19px;
position:relative;

`;

const MessageElement2 = styled.img`
width: fit-content;
padding:10px;
margin:10px;
min-width:80px;
padding-bottom:19px;


`;

const Sender = styled(MessageElement)`
margin-left:auto;
background-color: #dcf8c6;
border-top-left-radius:11px;
border-top-right-radius:11px;
border-bottom-right-radius:11px;
text-align:right;

`

const Sender1 = styled(MessageElement2)`
margin-left:70%;
margin-right:10px;
background-color: #dcf8c6;
border-top-left-radius:11px;
border-top-right-radius:11px;
border-bottom-right-radius:11px;
text-align:right;
max-width:280px;

`
const Receiver = styled(MessageElement)`
background-color: whitesmoke;
text-align:right;
border-top-right-radius:11px;
border-top-left-radius:11px;
border-bottom-left-radius:11px;
`
const Receiver1 = styled(MessageElement2)`
background-color: whitesmoke;
text-align:right;
border-top-right-radius:11px;
border-top-left-radius:11px;
border-bottom-left-radius:11px;
max-width:280px;
`

const Timestamp = styled.span`
color:grey;
padding:10px;
padding-top:5px;
font-size:8px;
position:absolute;
bottom:0;
right: 0;
text-align:right;
right:0;
`


