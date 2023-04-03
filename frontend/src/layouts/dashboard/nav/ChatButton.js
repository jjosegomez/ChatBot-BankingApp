import { useState } from 'react';
import Box from '@mui/material/Box';
import ChatUI from './ChatUI.js';
import Button from "@mui/material/Button"

const ChatButton = () => {
    const [showChat, setShowChat] = useState(false); //block for visible
    const [visible, setVisible] = useState("-400px");
    const [buttonText, setButtonText] = useState("Need Assistance")

    const handleShowChat = () => {
        if(showChat == false){
            setVisible("70px");
            console.log(visible)
            setButtonText("Close")
        }
        else{
            setVisible("-400px")
            console.log(visible)
            setButtonText("Need Assistance?")
        }
        setShowChat(!showChat)
    }

    return (
        <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
            <Button onClick={() => {handleShowChat()}}
                variant="contained"
                sx={{ fontsize: '1.5rem' }}>
                {buttonText}
            </Button>
            <ChatUI showChat={showChat} isVisible={visible}/>
        </Box>
    );
}

export default ChatButton;