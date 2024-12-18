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

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  setOpenDialog,
  setIsregis,
  openDialog,
  LoginUser,
}) => {
  return (
    <div>
      <Dialog open={openDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
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
            label="password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              LoginUser();
            }}
            disabled={!(email && password)}
            variant="contained"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setIsregis(true);
            }}
            color="primary"
          >
            <span>Don't have an account? Register</span>
          </Button>

          {/* <Link
            to="/register"
            onClick={() => {
              setOpenDialog(false);
              setIsregis(true);
            }}
            color="primary"
          >
            Don't have an account? Register
          </Link> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
