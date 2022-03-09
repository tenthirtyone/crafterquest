import * as React from "react";
import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import ProviderContext from "../ProviderContext";
import Button from "@mui/material/Button";

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

function formatAccount(account) {
  if (!account) return "";

  return account.slice(0, 4) + "..." + account.slice(-4);
}

async function getAccounts(provider, setAccount) {
  const accounts = await provider.send("eth_requestAccounts", []);
  setAccount(accounts[0]);
}

const TopBar = () => {
  const [activePage, setActivePage] = useState("resources");
  const [account, setAccount] = useState(null);
  const provider = useContext(ProviderContext);

  useEffect(() => {
    getAccounts(provider, setAccount);
  }, []);

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
              style={activePage === "crafting" ? activeLinkStyle : linkStyle}
              onClick={() => {
                setActivePage("crafting");
              }}
              to="/crafting"
            >
              Crafting
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={account || ""}>
              <Button
                variant="outlined"
                sx={{
                  padding: "4px",
                  backgroundColor: "#222222",
                  borderRadius: 0,
                }}
              >
                {formatAccount(account)}
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
