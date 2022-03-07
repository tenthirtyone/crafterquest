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

contract("StakingToken", (accounts) => {
  const [creator, user, anotherUser, operator, mallory] = accounts;
  let resourceToken;
  let stakingToken;
  const resourceAddress = "0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4";
  const stakingAddress = "0x30753E4A8aad7F8597332E813735Def5dD395028";

  beforeEach(async () => {
    resourceToken = await MockResourceToken.new();
    stakingToken = await MockStakingToken.new(resourceToken.address);
  });

  it("deployed", async () => {
    expect(resourceToken.address).to.equal(resourceAddress);
    expect(stakingToken.address).to.equal(stakingAddress);
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
