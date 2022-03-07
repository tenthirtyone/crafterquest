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

contract("StakingToken", (accounts) => {
  const [creator, user, anotherUser, operator, mallory] = accounts;
  let resourceToken;
  let stakingToken;
  const resourceAddress = "0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4";
  const stakingAddress = "0x30753E4A8aad7F8597332E813735Def5dD395028";
  const faucetAmount = 1e10;

  beforeEach(async () => {
    resourceToken = await MockResourceToken.new();
    stakingToken = await MockStakingToken.new(resourceToken.address);

    await resourceToken.faucet.sendTransaction(faucetAmount, { from: user });
  });

  it("deployed", async () => {
    expect(resourceToken.address).to.equal(resourceAddress);
    expect(stakingToken.address).to.equal(stakingAddress);
  });

  it("approves and transfers resource tokens into the staking contract", async () => {
    await resourceToken.approve(stakingToken.address, faucetAmount, {
      from: user,
    });

    await stakingToken.stake(faucetAmount, { from: user });

    const stakingTokenBalance = await resourceToken.balanceOf.call(
      stakingToken.address
    );

    expect(stakingTokenBalance.toNumber()).to.equal(faucetAmount);
  });
  it("calculates the stake tokens earned after blocks have been mined", async () => {
    const blocksToMine = 100;
    const tokensToStake = 1;
    const stakeRewardRate = 1;
    await resourceToken.approve(stakingToken.address, tokensToStake, {
      from: user,
    });

    await stakingToken.setStakeRewardPerBlock(stakeRewardRate);
    await stakingToken.stake(tokensToStake, { from: user });

    await mineNBlocks(blocksToMine);

    const reward = await stakingToken.stakingTokensEarned.call({ from: user });

    expect(reward.toNumber()).to.equal(
      blocksToMine * tokensToStake * stakeRewardRate
    );
  });
  it("harvests the current reward without withdrawing tokens", async () => {
    const blocksToMine = 100;
    const tokensToStake = 1;
    const stakeRewardRate = 1;
    await resourceToken.approve(stakingToken.address, tokensToStake, {
      from: user,
    });

    await stakingToken.setStakeRewardPerBlock(stakeRewardRate);
    await stakingToken.stake(tokensToStake, { from: user });

    await mineNBlocks(blocksToMine);

    await stakingToken.harvest({ from: user });

    let userBalance = await stakingToken.balanceOf.call(user);
    let reward = await stakingToken.stakingTokensEarned.call({ from: user });
    expect(reward.toNumber()).to.equal(0);
    expect(userBalance.toNumber()).to.equal(blocksToMine + 1); // harvest call advances 1 block;

    await mineNBlocks(blocksToMine);

    reward = await stakingToken.stakingTokensEarned.call({ from: user });

    expect(reward.toNumber()).to.equal(blocksToMine);

    await stakingToken.harvest({ from: user });
    userBalance = await stakingToken.balanceOf.call(user);
    expect(userBalance.toNumber()).to.equal((blocksToMine + 1) * 2);

    await stakingToken.harvest({ from: user });
    userBalance = await stakingToken.balanceOf.call(user);
    expect(userBalance.toNumber()).to.equal((blocksToMine + 1) * 2 + 1);
  });
  it("withdraws the staked tokens to user, harvests the reward owed", async () => {
    const blocksToMine = 100;
    const tokensToStake = 1;
    const stakeRewardRate = 1;
    await resourceToken.approve(stakingToken.address, tokensToStake, {
      from: user,
    });

    await stakingToken.setStakeRewardPerBlock(stakeRewardRate);
    await stakingToken.stake(tokensToStake, { from: user });

    let userResourceTokenBalance = await resourceToken.balanceOf(user);
    expect(userResourceTokenBalance.toNumber()).to.equal(
      faucetAmount - tokensToStake
    );

    await mineNBlocks(blocksToMine);

    await stakingToken.withdraw({ from: user });

    let userBalance = await stakingToken.balanceOf.call(user);
    let reward = await stakingToken.stakingTokensEarned.call({ from: user });
    expect(reward.toNumber()).to.equal(0);
    expect(userBalance.toNumber()).to.equal(blocksToMine + 1); // harvest call advances 1 block;

    await mineNBlocks(blocksToMine);

    reward = await stakingToken.stakingTokensEarned.call({ from: user });
    expect(reward.toNumber()).to.equal(0);

    userResourceTokenBalance = await resourceToken.balanceOf(user);
    expect(userResourceTokenBalance.toNumber()).to.equal(faucetAmount);

    const stakingResourceTokenBalance = await resourceToken.balanceOf(
      stakingToken.address
    );
    expect(stakingResourceTokenBalance.toNumber()).to.equal(0);
  });
  describe("helpers", () => {
    it("mines new block", async () => {
      const blocksToMine = 100;
      const currentBlock = await web3.eth.getBlockNumber();

      for (let i = 0; i < blocksToMine; i++) {
        await mineBlock();
      }

      const nextBlock = await web3.eth.getBlockNumber();

      expect(nextBlock).to.equal(currentBlock + blocksToMine);
    });
  });
});
