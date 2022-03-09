import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import StakeResources from "./StakeResources";
import HarvestResources from "./HarvestResources";

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <StakeResources title={"Stake Resources"} />
        </Grid>
        <Grid item md={6}>
          <HarvestResources title={"Harvest Resources"} />
        </Grid>
      </Grid>
    </Box>
  );
}
