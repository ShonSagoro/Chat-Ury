import {Link} from "react-router-dom"
import Logo from '../assets/img/LOGO-BLANCO.png'
import ParticularChat from '../assets/img/chat-BLANCO.png'
import GeneralChat from '../assets/img/speak-BLANCO.png'
import '../assets/css/header.css'
import {UseMessages} from "../context/MessagesProvider";

function Header() {
    const {setmessages}=UseMessages();
    
    const handleOnClick=()=>{
        setmessages([]);
    }
    
    return(
        <header className="header">
            <Link to='/menu'><img onClick={handleOnClick} src={Logo}></img></Link>
            <ul>
                <li><Link to='/chats'><img onClick={handleOnClick} src={ParticularChat} alt="Particular Chat"></img></Link></li>
                <li><Link to='/general'><img onClick={handleOnClick} src={GeneralChat} alt="General Chat"></img></Link></li>
            </ul>
        </header>
    );
}

export default Header