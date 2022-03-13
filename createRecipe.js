const HDWalletProvider = require("@truffle/hdwallet-provider");
const crafterverseABI = require("./client/src/artifacts/Crafterverse.json").abi;
const crafterverseAddress = "0x70CA9EA9200474b1078621834b27c3dfc348C30b";
const Contract = require("web3-eth-contract");

const Web3 = require("web3");
const mnemonicPhrase =
  "receive fury leg toast damage index close cool corn grunt spider bomb";
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl: "https://rpc-mumbai.maticvigil.com",
});

// HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
//const web3 = new Web3(provider);

// Or, if web3 is alreay initialized, you can call the 'setProvider' on web3, web3.eth, web3.shh and/or web3.bzz
//web3.setProvider(provider);

// ...
// Write your code here.
// ...

Contract.setProvider(provider);

const contract = new Contract(crafterverseABI, crafterverseAddress);

contract.methods
  .addRecipe(
    "Magic Scroll",
    "0x45f238447083ebF25Fd084D79E9E280ed86AC16e",
    10,
    10
  )
  .send({ from: "0x8d0726f5b95bec4d1048ca8ef919b0fcbcafbe2b" })
  .on("receipt", function (receipt) {
    console.log(receipt);
  });
// contract.methods.addRecipe();

// At termination, `provider.engine.stop()' should be called to finish the process elegantly.
//provider.engine.stop();
