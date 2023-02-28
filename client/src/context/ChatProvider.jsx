import React, { useMemo, useState} from "react";


import ChatContext from "./ChatContext";

const ChatProvider=({children})=>{
    const [conversation, setConversation] = useState({
        from:  {
            username: "general",
            id: "general",
        },
        to:  {
            username: "general",
            id: "general",
        }
    });
    const [status, setStatus] = useState(false);

    const setUserOrigin=(userOrigin)=>{
        setConversation({
            from: userOrigin,
            to: conversation.to,
        })
    }


    const setUserDestination=(userDestination)=>{
        setConversation({
            from: conversation.from,
            to: userDestination
        })
    }
    
    const toGeneral=()=>{
        setConversation({
            from: conversation.from,
            to: {
                username: "general",
                id: "general",
            }
        })
        setStatus(false);
    }

    const value= useMemo(()=>{
        return({
            conversation,
            status,
            setUserOrigin,
            setUserDestination,
            setStatus,
            toGeneral,
        }) 
    }, [conversation, status])

    return(
        <ChatContext.Provider
            value={value}
        >
            {children}
        </ChatContext.Provider>
    );
}

export default ChatProvider;

export function UseChat() {
    const context=React.useContext(ChatContext);
    if(!context){throw new Error('useChat debe estar dentro del proceedor ChatContext')}

    return context;
}
