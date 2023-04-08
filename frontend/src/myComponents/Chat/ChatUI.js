import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { apiBaseURL } from 'src/_mock/account';
import { defaultHeaders } from 'src/_mock/account';


function ChatUI(props) {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const [messageSide, setMessageSide] = useState('right'); // track message side

  const handleSend = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, { message: chatMessage, side: 'right' }]);
      setChatMessage('');
    }

    console.log(chatMessage);
    const url = apiBaseURL + "chatbot/"
    const input = {
      "input": `${chatMessage}`
    }
    let response = axios.post(url, input, { headers: defaultHeaders }).then(response => {

      setChatMessages(prevChatMessages => [...prevChatMessages, { message: response.data.ChatBotResponse, side: 'left' }]);

    })
      .catch(error => {
        console.error(error);
        setChatMessages(prevChatMessages => [...prevChatMessages, { message: "Sorry I am having trouble connecting", side: 'left' }]);

      });


  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Box sx={{
      border: "lightgrey solid 1px", position: 'fixed', bottom: props.isVisible, right: '20px', zIndex: 9999,
      backgroundColor: "#fff", borderRadius: "2%", overflow: "hidden", transition: ".5s", maxHeight: "600px",

    }}>
      <Stack>
        <Item>
          <Box sx={{ height: "30px", display: 'flex', justifyContent: 'center', p: 1, backgorundColor: "rgb(52,103,203)" }}>
            <Typography
              sx={{ m: 1 }}
              variant='h5'
              color="textPrimary">
              Ask Us a Question
            </Typography>
          </Box>
        </Item>
        <Item>
          <Box ref={chatBoxRef} sx={{ display: 'flex', flexFlow: 'column', height: '340px', overflowY: "scroll", }}>

            {chatMessages.map(({ message, side }, index) => (
              <Typography sx={{
                display: "inline-block",
                backgroundColor: "#f2f2f2",
                padding: "5px 15px",
                margin: "10px",
                borderRadius: "10px",
                maxWidth: "fit-content",
                ml: side === 'left' ? 2 : 'auto', // set margin-left or margin-right depending on message side
                mr: side === 'right' ? 2 : 'auto', // set margin-right or margin-left depending on message side
              }}
                key={index} color="textSecondary">
                {message}
              </Typography>
            ))}
          </Box>
        </Item>
        <Item>
          <Box sx={{ display: 'flex', m: 2 }}>
            <TextField
              label="Type your message"
              variant="outlined"
              size="small"
              color="primary"
              value={chatMessage}
              onChange={(event) => setChatMessage(event.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button sx={{ ml: 1 }} variant="contained" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Item>
      </Stack>
    </Box>
  );
}

export default ChatUI;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));