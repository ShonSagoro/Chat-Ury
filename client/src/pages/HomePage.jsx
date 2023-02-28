import {useNavigate} from "react-router-dom"
import {useEffect, useState } from "react";
import logo from "../assets/img/LOGO-ROSA.png";
import {UseUser} from "../context/UserProvider";


function HomePage() {
  const {user,login}=UseUser();

  const navigate= useNavigate();

  const [placeholderText, setPlaceholderText] = useState("ex: Juan");
  const [name, setName] = useState("");

  useEffect(()=>{
    if(user!=null && user.username!=user.id){
      setTimeout(()=>{navigate("/menu")},200)
    }},[user])

  
  const handleName = (e) => {
    setName(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if(name!=""){
      login(name);
      setName("");
      if(user==null || user.username!=user.id){
        setPlaceholderText("Cambia de nombre, ya esta en uso ese")
      }
    }
  };

  

  return (
    <>
      <div className="h-screen bg-zinc-800 text-white flex justify-evenly items-center flex-row">
        <div className="items-center justify-center">
          <img src={logo} className="w-96 h-auto"></img>
          <p className="text-5xl text-center my-4">CHAT-URY</p>
        </div>

        <div className="h-auto w-2/5 bg-zinc-900 p-4 rounded-lg">
            <form onSubmit={handleSubmit}>
                <p className="text-4xl my-5">Your name:</p>
                <input
                    value={name}
                    type="text"
                    onChange={handleName}
                    placeholder={placeholderText}
                    className=" text-2xl w-full border-zinc-500 text-black  rounded-lg p-4"
                ></input>

                <input
                    type="submit"
                    className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-2xl"
                    value="ENTRA"
                ></input>
                
            </form>
        </div>
      </div>
    </>
  );
}

export default HomePage;
