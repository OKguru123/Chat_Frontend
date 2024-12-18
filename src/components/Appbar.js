import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Appbar = ({
  handleHovermobile,
  handleMouseLeaveMobi,
  setDrawerOpen,
  userInfo,
}) => {
  return (
    <div>
      <AppBar
        position="static"
        onMouseLeave={handleMouseLeaveMobi}
        onClick={(e) => e.stopPropagation()}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6">Chat App</Typography>
            <Avatar
             
              sx={{ bgcolor: "#FF5722" }}
              onMouseEnter={handleHovermobile}
              style={{ cursor: "pointer" }}
            >
              {userInfo?.name?.charAt(0)}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
