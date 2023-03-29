import { textAlign } from "@mui/system";
import {React, useState} from "react";
import Button from "src/theme/overrides/Button";
import "./chat.css"


const Chat = () => {

    const [isClicked, setIsClicked] = useState(false);
    const [chatClass, setChatClass] = "invisible";

    function toggleClick(){
        if(isClicked){
            setChatClass("visible");
            setIsClicked(!isClicked);
        }
        else{
            setChatClass("invisible");
            setIsClicked(!isClicked);
        }
    }

    return(
        <div>   
            <Button className={isClicked} sx={{textAlign:"center"}}></Button>
            <div className="chat">this is the chat bot</div>
        </div>
    );
}

export default Chat;