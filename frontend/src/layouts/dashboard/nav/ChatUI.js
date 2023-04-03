import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ChatUI(props) {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSend = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, chatMessage]);
      setChatMessage('');
    }
  };

  return (
      <Box sx={{border: "lightgrey solid 1px", position: 'fixed',  bottom:props.isVisible, right: '20px', zIndex: 9999, 
                backgroundColor: "#fff", borderRadius: "2%", overflow: "hidden", transition:".5s"}}>
        <Box sx={{display: 'flex', flexFlow: 'column', height: '340px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 , backgorundColor:"rgb(52,103,203)"}}>
            <Typography 
            sx={{m:1}}
            variant='h5'
            color="textPrimary">
              Jackson
            </Typography>
          </Box>
          {chatMessages.map((message, index) => (
            <Typography sx={{display: "inline-block", backgroundColor: "#f2f2f2", padding: "5px 15px", margin: "10px", borderRadius: "10px", maxWidth: "fit-content", ml:2}}
            key={index} color="textSecondary">
              {message}
            </Typography>
          ))}
        </Box>
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
          <Button sx={{ml:1}} variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Box>
  );
}

export default ChatUI;