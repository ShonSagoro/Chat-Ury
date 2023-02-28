import React, { useEffect, useMemo, useState} from "react";
import socket, {checkState, getState } from "../utils/socket-methods";

import ConnectionContext from "./ConnectionContext";

const ConnectionProvider=({children})=>{
    const [connection, setConnection]=useState({});

    useEffect(()=>{
        getState(socket, data=>{
            setConnection(data);
        });
    },[connection])

    const verityConnecion=(socket)=>{
        checkState(socket);
    }

    const value= useMemo(()=>{
        return({
            connection,
            verityConnecion,
        }) 
    }, [connection]);
    
    return(
        <ConnectionContext.Provider
            value={value}
        >
            {children}
        </ConnectionContext.Provider>
    );
}

export default ConnectionProvider;

export function UseConnection() {
    const context=React.useContext(ConnectionContext);
    if(!context){throw new Error('UseConnection debe estar dentro del proceedor ConnectionContext')}

    return context;
}

