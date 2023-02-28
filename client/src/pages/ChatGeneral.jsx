import ViewChat from "../components/ViewChat";
import Header from "../components/Header";
import { UseChat } from "../context/ChatProvider";
import { useEffect } from "react";

function ChatGeneral() {
    const {toGeneral}=UseChat();
    useEffect(()=>{
        toGeneral();
    },[]);

    return ( 
        <>
        <Header/>
        <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
            <div className="h-4/5 w-1/2 items-center justify-center">
            <ViewChat/>
            </div>
        </div>
        
        </>
     );
}

export default ChatGeneral;