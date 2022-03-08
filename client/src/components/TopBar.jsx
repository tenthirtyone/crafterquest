import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

const linkStyle = {
  margin: "1em",
  color: "#00aeef",
  textDecoration: "none",
  fontWeight: 700,
};
const activeLinkStyle = {
  margin: "1em",
  color: "#00aeef",
  textDecoration: "none",
  fontWeight: 700,
  borderBottom: "solid",
};

const TopBar = () => {
  const [activePage, setActivePage] = useState("resources");

  return (
    <AppBar position="static" style={{ backgroundColor: "rgba(0,0,0,1)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: {
                xs: "none",
                md: "flex",
                color: "#00aeef",
                fontWeight: 700,
              },
            }}
          >
            Crafterverse
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Link
              style={activePage === "resources" ? activeLinkStyle : linkStyle}
              onClick={() => {
                setActivePage("resources");
              }}
              to="/resources"
            >
              Resources
            </Link>
            <Link
              style={activePage === "recipes" ? activeLinkStyle : linkStyle}
              onClick={() => {
                setActivePage("recipes");
              }}
              to="/recipes"
            >
              Recipes
            </Link>
            <Link
              style={activePage === "inventory" ? activeLinkStyle : linkStyle}
              onClick={() => {
                setActivePage("inventory");
              }}
              to="/inventory"
            >
              Inventory
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
