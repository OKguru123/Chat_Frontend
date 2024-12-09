import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { pink } from "@mui/material/colors";

const Sidebar = ({
  userInfo,
  rooms,
  users,
  currentChat,
  userId,
  joinRoom,
  joinRoomChat,
  selectUser,
  createRoom,
  token,
  setToken,
}) => {
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [otherRooms, serOtherRooms] = useState([]);
  const [isLogoutshow, setIsLogoutShow] = useState(false);

  useEffect(() => {
    setJoinedRooms(
      rooms.filter((room) => {
        return room.joiners.includes(userId);
      })
    );
    serOtherRooms(
      rooms.filter((room) => {
        return !room.joiners.includes(userId);
      })
    );
  }, [rooms]);
  const handleHover = () => {
    // alert("hover on avtar");
    setIsLogoutShow(true);
  };
  const handleMouseLeave = () => {
    setIsLogoutShow(false);
  };
  const Logoutuser = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <>
      <Box padding={2} onMouseLeave={handleMouseLeave}>
        {/* Logout page */}

        <div
          style={{
            left: isLogoutshow ? "0px" : "-300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            marginTop: "10px",
            width: "300px",
            height: "50px",
            transition: "300ms",

            zIndex: "1000",
          }}
          onMouseLeave={handleMouseLeave}
        >
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#FF5722",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={Logoutuser}
          >
            Logout
          </button>
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 4,
          }}
        >
          <Avatar
            sx={{ bgcolor: "#FF5722" }}
            onMouseEnter={handleHover}
            style={{ cursor: "pointer" }}
          >
            {userInfo?.name?.charAt(0)}
          </Avatar>
          <Typography variant="h6">{userInfo?.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6"> Rooms</Typography>

          <Tooltip title="Create Room">
            <IconButton variant="contained" fullWidth onClick={createRoom}>
              <ControlPointIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          {joinedRooms.length > 0 && (
            <>
              <Typography variant="body1">Joined Rooms</Typography>
              <List>
                {joinedRooms.map((room) => (
                  <ListItem
                    button
                    key={room?.id}
                    onClick={() => joinRoomChat(room)}
                    sx={{
                      backgroundColor:
                        currentChat?.id === room?.id ? "#F1F0E8" : "",
                    }}
                  >
                    <ListItemText
                      primary={room?.name}
                      sx={{ cursor: "pointer" }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {otherRooms.length > 0 && (
            <>
              <Typography variant="body1">Other Rooms</Typography>
              <List>
                {otherRooms.map((room) => (
                  <ListItem
                    button
                    key={room?.id}
                    onClick={() => joinRoom(room)}
                    sx={{
                      backgroundColor:
                        currentChat?.id === room?.id ? "#F1F0E8" : "",
                    }}
                  >
                    <ListItemText
                      primary={room?.name}
                      sx={{ cursor: "pointer" }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
        <Typography variant="h6">Users</Typography>
        <List>
          {users
            .filter((user) => user.id !== userId)
            .map((user) => (
              // console.log(users),
              <ListItem
                button
                key={user?.id}
                onClick={() => selectUser(user)}
                sx={{
                  backgroundColor:
                    currentChat?.id === user?.id ? "#F1F0E8" : "",
                }}
              >
                <ListItemText primary={user?.name} sx={{ cursor: "pointer" }} />
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
