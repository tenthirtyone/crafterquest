const Crafterverse = artifacts.require("Crafterverse");
const MockResourceToken = artifacts.require("RESToken");
const MockStakingToken = artifacts.require("cRESToken");
const { expect } = require("chai");

contract("Crafterverse", (accounts) => {
  const [creator, user, anotherUser, operator, mallory] = accounts;
  let crafterverse, resourceToke, stakingToken;
  const address = "0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4";
  const faucetAmount = 1e10;

  const recipeName = "Steel Dagger";
  let recipeIngredients = [];
  const recipeAmounts = [10];
  const recipeSkill = 10;

  beforeEach(async () => {
    crafterverse = await Crafterverse.new();
    resourceToken = await MockResourceToken.new();
    stakingToken = await MockStakingToken.new(
      resourceToken.address,
      crafterverse.address
    );

    await resourceToken.faucet.sendTransaction(faucetAmount, { from: user });

    recipeIngredients.push(stakingToken.address);
  });

  it("deployed", async () => {
    expect(crafterverse.address).to.equal(address);
  });

  it("has an owner", async () => {
    expect(await crafterverse.owner()).to.equal(creator);
  });

  it("adds a recipe", async () => {
    console.log(recipeName, recipeIngredients, recipeAmounts, recipeSkill);
    await crafterverse.addRecipe(
      recipeName,
      recipeIngredients,
      recipeAmounts,
      recipeSkill
    );
  });
});
