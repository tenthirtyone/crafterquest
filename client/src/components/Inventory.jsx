import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
  GiAnvilImpact,
  GiCrossbow,
  GiSewingNeedle,
  GiBattleAxe,
} from "react-icons/gi";

function InventoryItem() {
  return (
    <div style={{ padding: "4px", margin: "4px", border: "solid 1px #000" }}>
      <GiBattleAxe style={{ width: "5em", height: "5em" }} />
    </div>
  );
}

export default function NestedList() {
  const [open, setOpen] = React.useState("");

  const handleClick = (listName) => {
    if (open === listName) {
      setOpen("");
    } else {
      setOpen(listName);
    }
  };

  return (
    <div
      style={{
        marginTop: "-1em",
        borderRadius: "2px",
        border: "solid 1px #fff",
        bgcolor: "background.paper",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <List
        sx={{ width: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{
              color: "#000000",
              textAlign: "left",
              fontWeight: 700,
              fontSize: 18,
              colSpan: 4,
            }}
          >
            Inventory
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => {
            handleClick("blacksmithing");
          }}
        >
          <ListItemIcon>
            <GiAnvilImpact style={{ width: "2em", height: "2em" }} />
          </ListItemIcon>
          <ListItemText primary="Blacksmithing" />
          {open === "blacksmithing" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === "blacksmithing"} timeout="auto" unmountOnExit>
          <div style={{ display: "flex" }}>
            <InventoryItem />
            <InventoryItem />
            <InventoryItem />
          </div>
        </Collapse>

        <ListItemButton
          onClick={() => {
            handleClick("woodworking");
          }}
        >
          <ListItemIcon>
            <GiCrossbow style={{ width: "2em", height: "2em" }} />
          </ListItemIcon>
          <ListItemText primary="Woodworking" />
          {open === "woodworking" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open === "woodworking"}
          timeout="auto"
          unmountOnExit
        ></Collapse>

        <ListItemButton
          onClick={() => {
            handleClick("leatherworking");
          }}
        >
          <ListItemIcon>
            <GiSewingNeedle style={{ width: "2em", height: "2em" }} />
          </ListItemIcon>
          <ListItemText primary="Leather Working" />
          {open === "leatherworking" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open === "leatherworking"}
          timeout="auto"
          unmountOnExit
        ></Collapse>
      </List>
    </div>
  );
}
