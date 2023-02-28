import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import ChatGeneral from "../pages/ChatGeneral";
import PersonalChat from "../pages/PersonalChat";
import UserProvider from "../context/UserProvider";
import ChatProvider from "../context/ChatProvider";
import PrivateRoutes from "./PrivateRoutes";
import MessagesProvider from "../context/MessagesProvider";

function AppRoutes() {
  return (
    <BrowserRouter>
        <UserProvider>
          <ChatProvider>
            <MessagesProvider>
              <Routes>
                <Route path="/*" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/menu"
                  element={
                    <PrivateRoutes>
                      <MenuPage />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/general"
                  element={
                    <PrivateRoutes>
                      <ChatGeneral />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/chats"
                  element={
                    <PrivateRoutes>
                      <PersonalChat />
                    </PrivateRoutes>
                  }
                />
              </Routes>
            </MessagesProvider>
          </ChatProvider>
        </UserProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
