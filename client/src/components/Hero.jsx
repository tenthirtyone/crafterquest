import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { GiOre, GiAnimalHide, GiForest, GiGems } from "react-icons/gi";

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

function ResourceCircle({ type, value, color }) {
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
        <div style={{ fontWeight: 700, fontSize: 28 }}>{value}</div>
      </div>
    </div>
  );
}

export default function BasicGrid() {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{
        backgroundColor: "rgba(0,0,0,1)",
        height: "300px",
        color: "#00aeef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md" style={{ marginBottom: "2em" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ResourceCircle type={"ore"} color={"#669999"} value={1000} />
          </Grid>
          <Grid item xs={3}>
            <ResourceCircle type={"lumber"} color={"#008000"} value={1200} />
          </Grid>
          <Grid item xs={3}>
            <ResourceCircle type={"leather"} color={"#906B52"} value={725} />
          </Grid>
          <Grid item xs={3}>
            <ResourceCircle type={"gems"} color={"#9016c0"} value={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
