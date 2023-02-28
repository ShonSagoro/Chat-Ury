import {useNavigate} from "react-router-dom"
import ParticularChat from '../assets/img/chat-BLANCO.png'
import GeneralChat from '../assets/img/speak-BLANCO.png'
import CardLink from './CardLink';
import {UseUser} from "../context/UserProvider";


function MenuComponent() {
    const navigate= useNavigate();
    const {logout, user, users}=UseUser();

    const options=[
        {
            name:"Particular Chat",
            img:ParticularChat,
            url: '/chats'
        },
        {
            name:"General Chat",
            img:GeneralChat,
            url: '/general'
        },
    ]

    const handleClick=()=>{
        logout();
        navigate('/home')
    }

    return (  
        <>
            <div className="h-screen bg-zinc-800 text-white flex justify-evenly items-center flex-col">
                <h1 className="w-full h-auto p-2 my-3 rounded-lg text-4xl text-center">Hola de nuevo: {user.username}</h1>
                <div className="flex flex-row h-2/3 w-2/3">
                    {
                        options.map((option)=>{
                            return(
                                <CardLink img={option.img} name={option.name} url={option.url}/>
                            );
                        })
                    }
                </div>
                <div>
                    <input
                        type="buttom"
                        onClick={handleClick}
                        value="leave"
                        className="w-full h-auto p-2 bg-pink-500 my-2 rounded-lg text-5xl text-center"
                    ></input>
                </div>
            </div>
        </>
    );
}

export default MenuComponent;