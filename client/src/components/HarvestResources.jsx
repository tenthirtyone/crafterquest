import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GiWarPick, GiFireAxe, GiBoneKnife, GiSwapBag } from "react-icons/gi";
import ProviderContext from "../ProviderContext";
import ContractContext from "../ContractContext";

function createData(
  name,
  contract,
  symbol,
  stakingContract,
  owed,
  stakingSymbol,
  icon
) {
  return { name, contract, symbol, stakingContract, owed, stakingSymbol, icon };
}

const rows = [
  createData(
    "Ore",
    "oreContract",
    "ore",
    "cOreContract",
    "cOreOwed",
    "cOre",
    <GiWarPick style={{ height: "2em", width: "2em", cursor: "pointer" }} />
  ),
  createData(
    "Lumber",
    "lumContract",
    "lum",
    "cLumContract",
    "cLumOwed",
    "cLum",
    <GiFireAxe style={{ height: "2em", width: "2em", cursor: "pointer" }} />
  ),
  createData(
    "Leather",
    "leaContract",
    "lea",
    "cLeaContract",
    "cLeaOwed",
    "cLea",
    <GiBoneKnife style={{ height: "2em", width: "2em", cursor: "pointer" }} />
  ),
  createData(
    "Gems",
    "gemContract",
    "gem",
    "cGemContract",
    "cGemOwed",
    "cGem",
    <GiSwapBag style={{ height: "2em", width: "2em", cursor: "pointer" }} />
  ),
];

async function harvestResource(contracts, stakingContract) {
  await contracts[stakingContract].harvest();
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

  const cOreOwed = await contracts.cOreContract.stakingTokensEarned.call(
    account
  );
  const cLeaOwed = await contracts.cLeaContract.stakingTokensEarned.call(
    account
  );
  const cLumOwed = await contracts.cLumContract.stakingTokensEarned.call(
    account
  );
  const cGemOwed = await contracts.cGemContract.stakingTokensEarned.call(
    account
  );

  setBalances({
    ore: ore.toNumber(),
    lum: lum.toNumber(),
    lea: lea.toNumber(),
    gem: gem.toNumber(),
    cOre: cOre.toNumber(),
    cLum: cLum.toNumber(),
    cLea: cLea.toNumber(),
    cGem: cGem.toNumber(),
    cOreOwed: cOreOwed.toNumber(),
    cLeaOwed: cLeaOwed.toNumber(),
    cLumOwed: cLumOwed.toNumber(),
    cGemOwed: cGemOwed.toNumber(),
  });
}

async function getAccounts(provider, setAccount) {
  const accounts = await provider.send("eth_requestAccounts", []);

  setAccount(accounts[0]);
}

export default function BasicTable({ title }) {
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
    cOreOwed: 0,
    cLeaOwed: 0,
    cLumOwed: 0,
    cGemOwed: 0,
  });

  useEffect(() => {
    getAccounts(provider, setAccount);

    if (account) {
      getBalances(contracts, account, setBalances);
      if (!updater) {
        setUpdater(
          setInterval(() => {
            getBalances(contracts, account, setBalances);
          }, 5000)
        );
      }
    }
  }, [account, balances]);

  return (
    <TableContainer component={Paper} style={{ marginTop: "-1em" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              style={{ fontWeight: 700, fontSize: 18, colSpan: 4 }}
              colSpan="4"
            >
              Harvest Resources
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>Balance</TableCell>
            <TableCell align="center">Harvest</TableCell>
            <TableCell align="center">Harvested</TableCell>
          </TableRow>

          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                height: "71px",
              }}
            >
              <TableCell align="center">{balances[row.owed]}</TableCell>
              <TableCell
                component="th"
                scope="row"
                align="center"
                onClick={() => {
                  harvestResource(contracts, row.stakingContract);
                }}
              >
                {row.icon}
              </TableCell>

              <TableCell align="center">
                {balances[row.stakingSymbol]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
