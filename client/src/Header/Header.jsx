import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import userAuth from "../../context/context";

export const ButtonAppBar = () => {
  const { user, setUser } = React.useContext(userAuth);
  console.log(user);

  const LogoutHandler = () => {
    setUser({});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#E3242B" }} position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "Fira Code" }}
            >
              Attendance Manager
            </Typography>
          </Link>

          {Object.keys(user).length === 0 ? (
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit" sx={{ fontFamily: "Fira Code" }}>
                Login
              </Button>
            </Link>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                color="inherit"
                sx={{ fontFamily: "Fira Code", color: "white" }}
              >
                {user[0].name}
              </Button>
              <Button
                color="inherit"
                sx={{ fontFamily: "Fira Code", color: "white" }}
                onClick={LogoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
