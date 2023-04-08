import { useState } from 'react';
import Box from '@mui/material/Box';
import ChatUI from './ChatUI.js';
import Button from "@mui/material/Button"

const ChatButton = () => {
    const [showChat, setShowChat] = useState(false); //block for visible
    const [visible, setVisible] = useState("-1000px");
    const [buttonText, setButtonText] = useState("Need Assistance?")

    const handleShowChat = () => {
        if (showChat == false) {
            setVisible("120px");
            console.log(visible)
            setButtonText("Close")
        }
        else {
            setVisible("-1000px")
            console.log(visible)
            setButtonText("Need Assistance?")
        }
        setShowChat(!showChat)
    }

    return (
        <Box sx={{ position: 'fixed', bottom: '50px', right: '20px', zIndex: 9999 }}>
            <Button size="Large" onClick={() => { handleShowChat() }}
                variant="contained"
                sx={{ fontsize: '1.5rem' }}>
                {buttonText}
            </Button>
            <ChatUI showChat={showChat} isVisible={visible} />
        </Box>
    );
}

export default ChatButton;