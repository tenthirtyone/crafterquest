import * as React from "react";
import { useContext, useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  GiAnvilImpact,
  GiCrossbow,
  GiSewingNeedle,
  GiBattleAxe,
  GiPocketBow,
  GiScrollUnfurled,
  GiScrollQuill,
} from "react-icons/gi";
import ProviderContext from "../ProviderContext";
import ContractContext from "../ContractContext";

async function getAccounts(provider, setAccount) {
  const accounts = await provider.send("eth_requestAccounts", []);

  setAccount(accounts[0]);
}

async function craftItem(contract, itemId, rank) {
  await contract.craftItem(itemId, rank);
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

export default function NestedList() {
  const [open, setOpen] = React.useState("");
  const contracts = useContext(ContractContext);
  const provider = useContext(ProviderContext);
  const [account, setAccount] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAccounts(provider, setAccount);
    if (contracts) {
      getCraftingRecipes(contracts.crafterverseContract, setRecipes);
    }
  }, [account]);

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
            Crafting Recipes
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
            {recipes
              .filter((recipe) => {
                return (
                  recipe.ingredient ===
                  "0x0249b1d3F03C3b67FC1c5cfd21fd1720f34e346f"
                );
              })
              .map((recipe) => {
                return (
                  <ListItemButton
                    key={recipe.index}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      craftItem(
                        contracts.crafterverseContract,
                        recipe.index,
                        1
                      );
                    }}
                  >
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
            {recipes
              .filter((recipe) => {
                return (
                  recipe.ingredient ===
                  "0x754DDb06e33346dDEaD59DB6F09D39Bd2A45B8C4"
                );
              })
              .map((recipe) => {
                return (
                  <ListItemButton
                    key={recipe.index}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      craftItem(
                        contracts.crafterverseContract,
                        recipe.index,
                        1
                      );
                    }}
                  >
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
            {recipes
              .filter((recipe) => {
                return (
                  recipe.ingredient ===
                  "0x8CA4E23C6aa988478eAE678cCFd1ec6049DA5868"
                );
              })
              .map((recipe) => {
                return (
                  <ListItemButton
                    key={recipe.index}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      craftItem(
                        contracts.crafterverseContract,
                        recipe.index,
                        1
                      );
                    }}
                  >
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
        <Collapse in={open === "gemcraft"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {recipes
              .filter((recipe) => {
                return (
                  recipe.ingredient ===
                  "0x45f238447083ebF25Fd084D79E9E280ed86AC16e"
                );
              })
              .map((recipe) => {
                return (
                  <ListItemButton
                    key={recipe.index}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      craftItem(
                        contracts.crafterverseContract,
                        recipe.index,
                        1
                      );
                    }}
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={recipe.name} />
                  </ListItemButton>
                );
              })}
          </List>
        </Collapse>
      </List>
    </div>
  );
}
