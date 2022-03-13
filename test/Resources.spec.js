const MockResourceToken = artifacts.require("RESToken");
const { expect } = require("chai");

contract("ResourceToken", (accounts) => {
  const [creator, user, anotherUser, operator, mallory] = accounts;
  let resourceToken;

  beforeEach(async () => {
    resourceToken = await MockResourceToken.new();
  });

  it("has a faucet", async () => {
    const faucetAmount = 1e10;
    await resourceToken.faucet.sendTransaction(faucetAmount, { from: user });

    const userBalance = await resourceToken.balanceOf.call(user);

    expect(userBalance.toNumber()).to.equal(faucetAmount);
  });

  it("approve another address for transfer", async () => {
    const faucetAmount = 1e10;
    await resourceToken.faucet.sendTransaction(faucetAmount, { from: user });

    await resourceToken.approve(anotherUser, faucetAmount, { from: user });

    await resourceToken.transferFrom(user, anotherUser, faucetAmount, {
      from: anotherUser,
    });

    const userBalance = await resourceToken.balanceOf.call(user);
    const anotherUserBalance = await resourceToken.balanceOf.call(anotherUser);

    expect(userBalance.toNumber()).to.equal(0);
    expect(anotherUserBalance.toNumber()).to.equal(faucetAmount);
  });
});
