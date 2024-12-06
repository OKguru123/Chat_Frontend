import React from "react";
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
  selectUser,
  createRoom,
}) => {
  return (
    <Box padding={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 4,
        }}
      >
        <Avatar sx={{ bgcolor: "#FF5722" }}>{userInfo?.name?.charAt(0)}</Avatar>
        <Typography variant="h6">{userInfo?.name}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h6">Rooms</Typography>
        <Tooltip title="Create Room">
          <IconButton variant="contained" fullWidth onClick={createRoom}>
            <ControlPointIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <List>
        {rooms.map((room) => (
          <ListItem
            button
            key={room?.id}
            onClick={() => joinRoom(room)}
            sx={{
              backgroundColor: currentChat?.id === room?.id ? "#F1F0E8" : "",
            }}
          >
            <ListItemText primary={room?.name} sx={{ cursor: "pointer" }} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6">Users</Typography>
      <List>
        {users
          .filter((user) => user.id !== userId)
          .map((user) => (
            <ListItem
              button
              key={user?.id}
              onClick={() => selectUser(user)}
              sx={{
                backgroundColor: currentChat?.id === user?.id ? "#F1F0E8" : "",
              }}
            >
              <ListItemText primary={user?.name} sx={{ cursor: "pointer" }} />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Sidebar;
