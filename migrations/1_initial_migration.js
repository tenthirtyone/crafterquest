const Crafterverse = artifacts.require("Crafterverse");
const LumToken = artifacts.require("cLUMToken");
const GemToken = artifacts.require("cGEMToken");
const LeaToken = artifacts.require("cLEAToken");
const cLumToken = artifacts.require("cLUMToken");

//const oreTokenAddress = "0x2C84D123C66a8a45D96a9191AeC7E92332a55041";
//const lumAddress = "0x52ede6FC4F888A821AfFe8768a7d5D2596E30b72";
//const gemAddress = "0x5916F590ab1CE14D46c2CE1aC7D8CdF48ba1F187";
const leaAddress = "0x4886918309D045Ca00d04E8157c69D4d484e9414";
const CVAddress = "0x70CA9EA9200474b1078621834b27c3dfc348C30b";

const cOreTokenAddress = "0x0249b1d3F03C3b67FC1c5cfd21fd1720f34e346f";

module.exports = function (deployer) {
  deployer.deploy(LeaToken, leaAddress, CVAddress);
  //deployer.deploy(cOreToken, oreTokenAddress, CVAddress);
};
