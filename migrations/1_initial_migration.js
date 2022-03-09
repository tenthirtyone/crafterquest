const Migrations = artifacts.require("Migrations");
const LeatherToken = artifacts.require("LEAToken");
const LumberToken = artifacts.require("LUMToken");
const OreToken = artifacts.require("OREToken");
const GemToken = artifacts.require("GEMToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(LeatherToken);
  deployer.deploy(LumberToken);
  deployer.deploy(OreToken);
  deployer.deploy(GemToken);
};
