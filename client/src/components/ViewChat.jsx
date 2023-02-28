import { useState, useEffect } from "react";
import CardMessages from "./CardMessages";
import logoimage from "../assets/img/image.png"
import logosend from "../assets/img/send.png"
import logoimagewpic from "../assets/img/image-ROSA.png"
import socket, { sendMessage, pullMessages } from "../utils/socket-methods";
import {UseUser} from "../context/UserProvider";
import {UseChat} from "../context/ChatProvider";
import {UseMessages} from "../context/MessagesProvider";


function ViewChat() {
    const {messages, setmessages}=UseMessages();
    const {user}=UseUser();
    const {conversation}=UseChat();
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();
    const [nameFile, setNameFile] = useState("");
    
  
    const handleMessage = (e) => {
      setMessage(e.target.value);
    };

    const handleSelectFile = (e) => {
      setNameFile(e.target.files[0].name);
      setFile(e.target.files[0]);
    };


    const messageWithFile=(messageObject)=>{
        messageObject.type = "file";
        messageObject.file = file;
        messageObject.mimeType = file.type;
        messageObject.nameFile = nameFile;
        
        sendMessage(socket, messageObject);
  
        const meMessage = {
          from: "me",
          to: conversation.to.id,
          body: message,
          type: "file",
          file: file,
          mimeType: file.type,
          filename: nameFile,
        };

        setmessages([meMessage, ...messages]);
    }

    const isMessageEmpty=()=>{
      return message != "";
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const messageObject = {
        from: user.username,
        to:conversation.to.id,
        body: message,
        type: "",
        file: null,
        mimeType: null,
        filename: "",
      };
      
      if (file) {
        messageWithFile(messageObject);
      } else if (isMessageEmpty()) {
          sendMessage(socket, messageObject);
          
          const meMessage = {
            from: "me",
            to:conversation.to.id,
            body: message,
            type: "text",
            file: null,
            mimeType: null,
            filename: "",
          }
          setmessages([meMessage, ...messages]);
      }

      setMessage("");
      setFile(undefined);
      setNameFile("");
    };
  
    useEffect(() => {
      const receiveMessage = (message) => {        
        setmessages([message, ...messages]);
      };
      pullMessages(socket, receiveMessage);
    }, [messages]);


    return ( 
    <>  
        <form onSubmit={handleSubmit} className="bg-zinc-900 w-full h-full p-11">
          <CardMessages messages={messages} />
          
          <div className="w-full flex flex-row justify-center">
            <input
              value={message}
              type="text"
              onChange={handleMessage}
              placeholder="Escribe algo"
              className="border-zinc-500 p-2 text-black basis-full rounded-l-lg"
            >
            </input>

            <div>
              <label htmlFor="fileMessage" >
                  <i>
                    <img src={file? logoimagewpic: logoimage} className="w-10 h-full bg-zinc-50 p-2 basis-1/5"></img>
                  </i>
              </label>
              <input className="opacity-0 hidden" type="file" id="fileMessage" onChange={handleSelectFile}></input>
            </div>
            
            <input type="image" src={logosend} alt="Submit Form" className="w-10 h-auto bg-zinc-50 p-2 basis-/5 rounded-r-lg"/>
            
          </div>
          <h1 className="text-2x1 font-bold my-2 mx-2">Your username: {user.username} {conversation.to.username!=undefined? `-> ${conversation.to.username}`: ""}</h1>
        </form>
    </> 
    );
}

export default ViewChat;