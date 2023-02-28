import {Navigate} from "react-router-dom";
import {UseUser} from "../context/UserProvider";

const PrivateRoutes=({children})=> {
    const {user}=UseUser();
    return user!=null && user.username!=user.id? children: <Navigate to={'/home'}/>
}

export default PrivateRoutes;