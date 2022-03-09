import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GiWarPick, GiFireAxe, GiBoneKnife, GiSwapBag } from "react-icons/gi";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Order", 159),
  createData("Lumber", 237),
  createData("Leather", 262),
  createData("Gems", 305),
];

export default function BasicTable({ title }) {
  return (
    <TableContainer component={Paper} style={{ marginTop: "-1em" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              style={{ fontWeight: 700, fontSize: 18, colSpan: 4 }}
              colspan="4"
            >
              Harvest Resources
            </TableCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableCell>Balance</TableCell>
          <TableCell align="center">Harvest</TableCell>
          <TableCell align="center">Harvested</TableCell>
        </TableRow>

        <TableBody>
          <TableRow
            style={{ height: "71px" }}
            key={"ore"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              123
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              <GiWarPick style={{ height: "2em", width: "2em" }} />
            </TableCell>
            <TableCell align="center">1000</TableCell>
          </TableRow>
          <TableRow
            style={{ height: "71px" }}
            key={"lumber"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              123
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              <GiFireAxe style={{ height: "2em", width: "2em" }} />
            </TableCell>
            <TableCell align="center">1000</TableCell>
          </TableRow>
          <TableRow
            style={{ height: "71px" }}
            key={"leather"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              123
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              <GiBoneKnife style={{ height: "2em", width: "2em" }} />
            </TableCell>
            <TableCell align="center">1000</TableCell>
          </TableRow>
          <TableRow
            style={{ height: "71px" }}
            key={"gems"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              123
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              <GiSwapBag style={{ height: "2em", width: "2em" }} />
            </TableCell>
            <TableCell align="center">1000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
