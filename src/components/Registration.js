import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";

export const Registration = ({
  isregis,
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  setIsregis,
  setOpenDialog,
  registerUser,
}) => {
  return (
    <div>
      <Dialog open={isregis}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsregis(false);
              setOpenDialog(true);
            }}
            color="primary"
          >
            <span>Already have an account? Login</span>
          </Button>

          <Button
            onClick={registerUser}
            variant="contained"
            disabled={!(userName && password && email)}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
