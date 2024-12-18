import React, { useEffect, useState } from "react";
import LogOut from "./LogOut";
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
  setToken,
  setUserInfo,
  setOpenDialog,
  ismobil,
  isLogoutshow,
  setIsLogoutShow,
}) => {
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [otherRooms, serOtherRooms] = useState([]);
  // const [isLogoutshow, setIsLogoutShow] = useState(false);

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
    setToken("");
    setUserInfo(null);
    setOpenDialog(true);
  };
  // useEffect(() => {
  //   // console.log(window.innerWidth);
  // }, []);
  return (
    <>
      <Box padding={2} onMouseLeave={ismobil ? undefined : handleMouseLeave}>
        {!ismobil ? (
          <LogOut
            setOpenDialog={setOpenDialog}
            isLogoutshow={isLogoutshow}
            setToken={setToken}
            setUserInfo={setUserInfo}
            ismobil={ismobil}
          />
        ) : (
          ""
        )}

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
            onMouseEnter={ismobil ? undefined : handleHover}
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
              <Box
                sx={{
                  height: "200px",

                  overflowY: "auto",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
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
              </Box>
            </>
          )}
          {otherRooms.length > 0 && (
            <>
              <Typography variant="body1">Other Rooms</Typography>
              <Box
                sx={{
                  height: "200px",

                  overflowY: "auto",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
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
              </Box>
            </>
          )}
        </Box>
        <>
          <Typography variant="h6">Users</Typography>
          <Box
            sx={{
              height: "300px",

              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
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
                    <ListItemText
                      primary={user?.name}
                      sx={{ cursor: "pointer" }}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
        </>
      </Box>
    </>
  );
};

export default Sidebar;
