import React, { useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer, Box, useMediaQuery } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import io from "socket.io-client";
import axios from "axios";
import Sidebar from "../components/sidebar";
import LogOut from "../components/LogOut";
import ChatMessages from "../components/chatpage";
import { Registration } from "../components/Registration";
import Login from "../components/Login";
import Appbar from "../components/Appbar";

const backendURL = "http://192.168.100.186:5000";

const socket = io(backendURL);

function Home() {
  const messagesEndRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [isregis, setIsregis] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogoutshow, setIsLogoutShow] = useState(false);

  const [openDialog, setOpenDialog] = useState(
    !localStorage.getItem("userInfo")
  );

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (storedUserInfo) {
      setUserInfo(storedUserInfo);

      setUserId(storedUserInfo.id);

      setUserName(storedUserInfo.name);
    }
    if (storedUserInfo && storedUserInfo?.id) {
      registerUser();
    }

    if (token) {
      axios.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : "";

      axios.get(`${backendURL}/rooms`).then((res) => setRooms(res.data));
      axios.get(`${backendURL}/users`).then((res) => setUsers(res.data));
    }

    if (storedUserInfo && currentChat) {
      axios
        .get(`${backendURL}/messages`, {
          params: {
            sender_id: storedUserInfo.id,
            recipient_id: currentChat?.type === "user" ? currentChat?.id : "",
            
            room_id: currentChat?.type === "room" ? currentChat?.id : "",
          },
        })
        .then((res) => setMessages(res.data));
    }

    // socket.on("new_user", (user) => setUsers((prev) => [...prev, user]));
    socket.on("new_room", (room) => setRooms((prev) => [...prev, room]));
    socket.on("receive_private_message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    socket.on("receive_room_message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    return () => {
      socket.off("new_user");
      socket.off("new_room");
      socket.off("receive_private_message");
      socket.off("receive_room_message");
    };
  }, [socket, currentChat, token]);

  useEffect(() => {}, [userInfo]);

  const joinRoom = (room) => {
    setCurrentChat({ type: "room", ...room });
    socket.emit("join_room", { roomId: room.id, userId });
    socket.on("join_room_message_success", (message) => {
      toast.success(message);
    });
    socket.on("join_room_message_error", (message) => {
      toast.error(message);
    });
    setMessages([]);
    setDrawerOpen(false);
  };

  const joinRoomChat = (room) => {
    setCurrentChat({ type: "room", ...room });
    socket.emit("join_room_chat", { roomId: room.id });
    setMessages([]);
    setDrawerOpen(false);
  };

  const selectUser = (user) => {
    setCurrentChat({ type: "user", ...user });
    setMessages([]);
    setDrawerOpen(false);
  };

  const createRoom = () => {
    const roomName = prompt("Enter room name");
    if (roomName) {
      axios.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : "";
      axios
        .post(`${backendURL}/rooms`, { name: roomName, sender_id: userId })

        .catch((error) => console.error("Error creating room:", error));
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      if (currentChat?.type === "room") {
        socket.emit("send_room_message", {
          sender_id: userId,
          sender_info: userInfo,
          room_id: currentChat.id,
          content: message,
        });
      } else if (currentChat?.type === "user") {
        socket.emit("send_private_message", {
          sender_id: userId,
          sender_info: userInfo,
          recipient_id: currentChat.id,
          content: message,
        });
        let messageContent = {
          sender_id: userId,
          sender_info: userInfo,
          recipient_id: currentChat.id,
          content: message,
        };
        setMessages((prevMessages) => [...prevMessages, messageContent]);
      }
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const registerUser = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    axios
      .post(`${backendURL}/users`, {
        userId: storedUserInfo?.id,
        name: storedUserInfo ? storedUserInfo.name : userName,
        socketId: socket.id,
        email: storedUserInfo ? storedUserInfo.email : email,
        password: password,
      })
      .then((res) => {
        setPassword("");
        if (!storedUserInfo) {
          setIsregis(false);
          setOpenDialog(true);
          toast.success(`Registration successful! Welcome, ${userName}`);
        }
      })
      .catch((error) => {
        toast.error("Registration failed");
        console.error("Error registering user:", error);
      });
  };

  const LoginUser = (e) => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));


    axios
      .post(`${backendURL}/login`, {
        socketId: socket.id,
        email: email,
        password: password,
      })
      .then((res) => {
        const userData = {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
        };

        if (!storedUserInfo?.id) {
          setUserId(userData.id);
          setUserName(userData.name);
          setOpenDialog(false);
          setEmail(userData.email);
        }
        setUserInfo(userData);

        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);

        localStorage.setItem("userInfo", JSON.stringify(userData));

        toast.success(`Login successful! Welcome, ${userName}`);
      })
      .catch((error) => {
        toast.error("Login failed! Please try again.");
        console.error(
          "login failed",
          error.response ? error.response.data : error.message
        );
      });
  };


  const handleHovermobile = () => {

    setIsLogoutShow(true);
  };
  const handleMouseLeaveMobi = (e) => {
   
    setIsLogoutShow(false);
  };
  return (
    <>
      <ToastContainer />

      <Box display="flex" height="98vh">
        {!isMobile && (
          <Box width="400px" borderRight="1px solid #ddd">
            <Sidebar
              userInfo={userInfo}
              rooms={rooms}
              users={users}
              currentChat={currentChat}
              userId={userId}
              joinRoom={joinRoom}
              selectUser={selectUser}
              createRoom={createRoom}
              joinRoomChat={joinRoomChat}
              token={token}
              setToken={setToken}
              setUserInfo={setUserInfo}
              setOpenDialog={setOpenDialog}
              ismobil={false}
              setIsLogoutShow={setIsLogoutShow}
              isLogoutshow={isLogoutshow}
            />
          </Box>
        )}

        {isMobile && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Sidebar
              userInfo={userInfo}
              rooms={rooms}
              users={users}
              currentChat={currentChat}
              userId={userId}
              joinRoom={joinRoom}
              selectUser={selectUser}
              createRoom={createRoom}
              joinRoomChat={joinRoomChat}
              token={token}
              setToken={setToken}
              setUserInfo={setUserInfo}
              setOpenDialog={setOpenDialog}
              ismobil={true}
              setIsLogoutShow={setIsLogoutShow}
              isLogoutshow={isLogoutshow}
            />
          </Drawer>
        )}

        <Box flexGrow={1} display="flex" flexDirection="column">
          {isMobile ? (
            <LogOut
              setOpenDialog={setOpenDialog}
              isLogoutshow={isLogoutshow}
              setToken={setToken}
              setUserInfo={setUserInfo}
            />
          ) : (
            ""
          )}
          {isMobile && (
            <Appbar
              handleHovermobile={handleHovermobile}
              setDrawerOpen={setDrawerOpen}
              handleMouseLeaveMobi={handleMouseLeaveMobi}
              userInfo={userInfo}
            />
          )}

          <ChatMessages
            currentChat={currentChat}
            messages={messages}
            userId={userId}
            userInfo={userInfo}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Box>
      </Box>
      {/* changes in opendialog registration */}

      {isregis ? (
        <Registration
          isregis={isregis}
          userName={userName}
          setUserName={setUserName}
          email={email}
          setEmail={setEmail}
          password={password}
          setIsregis={setIsregis}
          setOpenDialog={setOpenDialog}
          registerUser={registerUser}
          setPassword={setPassword}
        />
      ) : (
        // creating a Login Page of Dialog
        <Login
          isregis={isregis}
          email={email}
          setEmail={setEmail}
          password={password}
          setIsregis={setIsregis}
          setOpenDialog={setOpenDialog}
          setPassword={setPassword}
          LoginUser={LoginUser}
          openDialog={openDialog}
        />
      )}
    </>
  );
}

export default Home;
