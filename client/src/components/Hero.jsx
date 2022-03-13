import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { GiOre, GiAnimalHide, GiForest, GiGems } from "react-icons/gi";
import CrafterLevel from "./CrafterLevel";
import ContractContext from "../ContractContext";
import ProviderContext from "../ProviderContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function getIcon(type, color) {
  switch (type) {
    case "ore":
      return <GiOre style={{ height: 100, width: 100, color }} />;
      break;
    case "leather":
      return <GiAnimalHide style={{ height: 100, width: 100 }} />;
      break;
    case "lumber":
      return <GiForest style={{ height: 100, width: 100 }} />;
      break;
    case "gems":
      return <GiGems style={{ height: 100, width: 100 }} />;
      break;
    default:
      return null;
  }
}

async function getBalances(contracts, account, setBalances) {
  const ore = await contracts.oreContract.balanceOf(account);
  const lea = await contracts.leaContract.balanceOf(account);
  const lum = await contracts.lumContract.balanceOf(account);
  const gem = await contracts.gemContract.balanceOf(account);
  const cOre = await contracts.cOreContract.balanceOf(account);
  const cLea = await contracts.cLeaContract.balanceOf(account);
  const cLum = await contracts.cLumContract.balanceOf(account);
  const cGem = await contracts.cGemContract.balanceOf(account);

  setBalances({
    ore: ore.toNumber(),
    lum: lum.toNumber(),
    lea: lea.toNumber(),
    gem: gem.toNumber(),
    cOre: cOre.toNumber(),
    cLum: cLum.toNumber(),
    cLea: cLea.toNumber(),
    cGem: cGem.toNumber(),
  });
}

async function getAccounts(provider, setAccount) {
  const accounts = await provider.send("eth_requestAccounts", []);

  setAccount(accounts[0]);
}

function ResourceCircle({ type, value, value2, color }) {
  return (
    <div
      style={{
        height: 200,
        width: 200,
        display: "flex",
        borderRadius: "50%",
        border: "solid 4px #657786",
        justifyContent: "center",
        alignItems: "center",
        color,
      }}
    >
      <div style={{ display: "block" }}>
        <div>{getIcon(type, color)}</div>
        <div style={{ fontWeight: 700, fontSize: 28 }}>{value}</div> -
        <div style={{ fontWeight: 700, fontSize: 28 }}>{value2}</div>
      </div>
    </div>
  );
}

export default function BasicGrid() {
  const [updater, setUpdater] = useState(null);
  const contracts = useContext(ContractContext);
  const provider = useContext(ProviderContext);
  const [account, setAccount] = useState(null);
  const [balances, setBalances] = useState({
    ore: 0,
    cOre: 0,
    lea: 0,
    cLea: 0,
    lum: 0,
    cLum: 0,
    gem: 0,
    cGem: 0,
  });
  useEffect(() => {
    getAccounts(provider, setAccount);

    if (account) {
      getBalances(contracts, account, setBalances);
      if (!updater) {
        setUpdater(
          setInterval(() => {
            getBalances(contracts, account, setBalances);
          }, 1000)
        );
      }
    }
  }, [account]);
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{
        backgroundColor: "rgba(0,0,0,1)",
        height: "400px",
        color: "#00aeef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md" style={{ marginBottom: "2em" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ResourceCircle
              type={"ore"}
              color={"#669999"}
              value={balances.ore}
              value2={balances.cOre}
            />
          </Grid>
          <Grid item xs={3}>
            <ResourceCircle
              type={"lumber"}
              color={"#008000"}
              value={balances.lum}
              value2={balances.cLum}
            />
          </Grid>
          <Grid item xs={3}>
            <ResourceCircle
              type={"leather"}
              color={"#906B52"}
              value={balances.lea}
              value2={balances.cLea}
            />
          </Grid>
          <Grid item xs={3}>
            <ResourceCircle
              type={"gems"}
              color={"#9016c0"}
              value={balances.gem}
              value2={balances.cGem}
            />
          </Grid>
        </Grid>
        <CrafterLevel />
      </Container>
    </Box>
  );
}
