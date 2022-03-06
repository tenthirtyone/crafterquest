const ResourceToken = artifacts.require("ResourceToken");

contract("ResourceToken", (accounts) => {
  const [creator, user, anotherUser, operator, mallory] = accounts;

  const initialSupply = 2e8;

  const tokens = [
    {
      initialSupply,
      name: "Ore",
      symbol: "ORE",
      contract: null,
    },
    {
      initialSupply,
      name: "Lumber",
      symbol: "LUM",
      contract: null,
    },
    {
      initialSupply,
      name: "Leather",
      symbol: "LEA",
      contract: null,
    },
    {
      initialSupply,
      name: "Ruins",
      symbol: "RUI",
      contract: null,
    },
  ];

  beforeEach(async () => {
    for (let i = 0; i < tokens.length; i++) {
      const { initialSupply, name, symbol } = tokens[i];
      console.log(initialSupply, name, symbol);
      tokens[i].contract = await ResourceToken.new(initialSupply, name, symbol);
    }
  });

  it("deployed", async () => {
    console.log(accounts);
    console.log(tokens[1].contract.address);
  });
});
