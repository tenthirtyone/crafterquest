const Crafterverse = artifacts.require("Crafterverse");
const MockResourceToken = artifacts.require("RESToken");
const MockStakingToken = artifacts.require("cRESToken");
const { expect } = require("chai");

mineBlock = () => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        jsonrpc: "2.0",
        method: "evm_mine",
        id: new Date().getTime(),
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        const newBlockHash = web3.eth.getBlock("latest").hash;

        return resolve(newBlockHash);
      }
    );
  });
};

mineNBlocks = async (n) => {
  for (let i = 0; i < n; i++) {
    await mineBlock();
  }
};

contract("Crafterverse", (accounts) => {
  const [creator, user, anotherUser, operator, mallory] = accounts;
  let crafterverse, resourceToken, stakingToken;
  const address = "0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4";
  const faucetAmount = 1e10;

  const recipeName = "Steel Dagger";

  const recipeAmount = 10;
  const recipeSkill = 10;

  beforeEach(async () => {
    crafterverse = await Crafterverse.new();
    resourceToken = await MockResourceToken.new();
    stakingToken = await MockStakingToken.new(
      resourceToken.address,
      crafterverse.address
    );

    await resourceToken.faucet.sendTransaction(faucetAmount, { from: user });
  });

  it("crafts a recipe", async () => {
    // Harvest some resources
    await resourceToken.approve(stakingToken.address, faucetAmount, {
      from: user,
    });
    await stakingToken.stake(faucetAmount, { from: user });

    await mineNBlocks(1000);
    await stakingToken.harvest({ from: user });

    let totalRecipes = await crafterverse.totalRecipes();

    await crafterverse.addRecipe(
      recipeName,
      stakingToken.address,
      recipeAmount,
      recipeSkill
    );

    totalRecipes = await crafterverse.totalRecipes();

    console.log(stakingToken.address);
    console.log(await stakingToken.getCraftingContractAddress());
    console.log((await stakingToken.balanceOf(user)).toNumber());
    console.log((await crafterverse.balanceOf(user)).toNumber());

    await crafterverse.craftItem(0, 1, { from: user });
    console.log((await stakingToken.balanceOf(user)).toNumber());
    console.log((await crafterverse.balanceOf(user)).toNumber());
  });
});
