import React, { useMemo, useState, useEffect} from "react";
import socket, { sendName, pulluser, pullUsers, updateUser } from "../utils/socket-methods";

import UserContext from "./UserContext";

const UserProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        pulluser(socket, data=>{
            try {
                setUser({
                    id: data.id,
                    username: data.username,
                })
            } catch (error) {
                console.log(error)
            }
        });
        pullUsers(socket, users=>{
            setUsers(users);
        });
    },[user, users]);

    
    const login=(name)=>{
        sendName(socket, name);
    }
    const updatelist=()=>{
        setUsers([]);
        updateUser(socket);
    }

    
    const logout=()=>{
          setUser(null);
          setUser([]);
      }
  
    const value= useMemo(()=>{
        return({
            user,
            users,
            login,
            logout,
            updatelist,
        }) 
    }, [user, users])

    return(
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

export function UseUser() {
    const context=React.useContext(UserContext);
    if(!context){throw new Error('useUser debe estar dentro del proceedor userConext')}

    return context;
}
