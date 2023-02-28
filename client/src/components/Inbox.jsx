import Chats from "./Chats";
import { UseChat } from "../context/ChatProvider";
import ViewChat from "./ViewChat";
import { UseUser } from "../context/UserProvider";

function Inbox() {
    const {user}=UseUser();
    const {status}=UseChat();
    
    return ( 
        <>  
            <div className="h-screen bg-zinc-800 text-white flex flex-row items-center justify-center">
                <div className="bg-zinc-900 h-5/6 w-1/6 mx-3 justify-center">
                    <Chats/>
                </div>
                <div className="bg-zinc-900 h-5/6 w-3/6 mx-3 justify-center">
                    {status ? (<ViewChat/>): (<p className="p-5 text-2xl items-center justify-center">Select a chat: {user.username}</p>)}
                </div>
            </div>

        </> 
    );
}

export default Inbox;