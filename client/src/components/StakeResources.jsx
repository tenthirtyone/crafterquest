import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import { FaFaucet } from "react-icons/fa";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Ore", 159),
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
              Stake Resources
            </TableCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableCell align="center">Faucet</TableCell>
          <TableCell>Resource</TableCell>
          <TableCell align="center">Balance</TableCell>
          <TableCell align="center">Stake</TableCell>
        </TableRow>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                <FaFaucet style={{ height: "2em", width: "2em" }} />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">
                <Switch />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
