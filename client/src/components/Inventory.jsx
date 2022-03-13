import * as React from "react";
import { useContext, useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ContractContext from "../ContractContext";
import ProviderContext from "../ProviderContext";
import {
  GiAnvilImpact,
  GiCrossbow,
  GiSewingNeedle,
  GiBattleAxe,
  GiScrollQuill,
} from "react-icons/gi";

async function getAccounts(provider, setAccount) {
  const accounts = await provider.send("eth_requestAccounts", []);

  setAccount(accounts[0]);
}
async function getCraftedItems(contract, account, setItems) {
  const balance = (await contract.balanceOf(account)).toNumber();
  const items = [];
  for (let i = 0; i < balance; i++) {
    const token = (await contract.tokenOfOwnerByIndex(account, i)).toNumber();
    const item = await contract.items(token);

    items.push(item);
  }
  console.log(items);
  setItems(items);
}

async function getCraftingRecipes(contract, setRecipes) {
  const totalRecipes = (await contract.totalRecipes()).toNumber();
  const recipes = [];
  for (let i = 0; i < totalRecipes; i++) {
    const recipe = await contract.recipes(i);
    recipes.push(recipe);
  }

  setRecipes(
    recipes.map((recipe, index) => {
      return {
        ...recipe,
        index,
      };
    })
  );
}

function InventoryItem() {
  return (
    <div style={{ padding: "4px", margin: "4px", border: "solid 1px #000" }}>
      <GiBattleAxe style={{ width: "5em", height: "5em" }} />
    </div>
  );
}

export default function NestedList() {
  const [open, setOpen] = React.useState("");

  const [itemUpdater, setItemUpdater] = useState(null);
  const contracts = useContext(ContractContext);
  const provider = useContext(ProviderContext);
  const [account, setAccount] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [items, setItems] = useState([]);

  const handleClick = (listName) => {
    if (open === listName) {
      setOpen("");
    } else {
      setOpen(listName);
    }
  };

  useEffect(() => {
    getAccounts(provider, setAccount);
    if (account) {
      getCraftedItems(contracts.crafterverseContract, account, setItems);
      if (!itemUpdater) {
        setInterval(() => {
          getCraftedItems(contracts.crafterverseContract, account, setItems);
        }, 5000);
      }
    }
    if (contracts) {
      getCraftingRecipes(contracts.crafterverseContract, setRecipes);
    }
  }, [account]);

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
          <List component="div" disablePadding>
            {items
              .filter((item) => {
                return (
                  recipes[item.id.toNumber()].ingredient ===
                  "0x0249b1d3F03C3b67FC1c5cfd21fd1720f34e346f"
                );
              })
              .map((item, index) => {
                const recipe = recipes[item.id.toNumber()];
                return (
                  <ListItemButton key={index} sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={recipe.name} />
                  </ListItemButton>
                );
              })}
          </List>
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
        <Collapse in={open === "woodworking"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items
              .filter((item) => {
                return (
                  recipes[item.id.toNumber()].ingredient ===
                  "0x754DDb06e33346dDEaD59DB6F09D39Bd2A45B8C4"
                );
              })
              .map((item, index) => {
                const recipe = recipes[item.id.toNumber()];
                return (
                  <ListItemButton key={index} sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={recipe.name} />
                  </ListItemButton>
                );
              })}
          </List>
        </Collapse>

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
        <Collapse in={open === "leatherworking"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items
              .filter((item) => {
                return (
                  recipes[item.id.toNumber()].ingredient ===
                  "0x8CA4E23C6aa988478eAE678cCFd1ec6049DA5868"
                );
              })
              .map((item, index) => {
                const recipe = recipes[item.id.toNumber()];
                return (
                  <ListItemButton key={index} sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={recipe.name} />
                  </ListItemButton>
                );
              })}
          </List>
        </Collapse>
        <ListItemButton
          onClick={() => {
            handleClick("gemcraft");
          }}
        >
          <ListItemIcon>
            <GiScrollQuill style={{ width: "2em", height: "2em" }} />
          </ListItemIcon>
          <ListItemText primary="Gem Crafting" />
          {open === "gemcraft" ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open === "gemcraft"}
          timeout="auto"
          unmountOnExit
        ></Collapse>
      </List>
    </div>
  );
}
