import React, { useMemo, useState, useEffect} from "react";

import MessagesContext from "./MessagesContext";

const MessagesProvider=({children})=>{
    const [messages, setmessages] = useState([
        {
          body: "Envia un mensaje",
          from: "Server",
          type: "text",
          to:""
        },
      ]);


      const value= useMemo(()=>{
        return({
            messages,
            setmessages,
        }) 
    }, [messages])

    return(
        <MessagesContext.Provider
            value={value}
        >
            {children}
        </MessagesContext.Provider>
    );
}

export default MessagesProvider;

export function UseMessages() {
    const context=React.useContext(MessagesContext);
    if(!context){throw new Error('UseMessages debe estar dentro del proceedor MessagesContext')}

    return context;
}
