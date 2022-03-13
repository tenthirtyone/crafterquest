import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import TopBar from "./components/TopBar";
import Resources from "./components/Resources";
import Crafting from "./components/Crafting";
import Hero from "./components/Hero";
import { ethers } from "ethers";
import ProviderContext from "./ProviderContext";
import ContractContext from "./ContractContext";

const oreABI = require("./artifacts/OREToken").abi;
const oreAddr = require("./artifacts/OREToken").networks[80001].address;
const cOreABI = require("./artifacts/cOREToken").abi;
const cOreAddr = require("./artifacts/cOREToken").networks[80001].address;

const lumABI = require("./artifacts/LUMToken").abi;
const lumAddr = require("./artifacts/LUMToken").networks[80001].address;
const cLumABI = require("./artifacts/cLUMToken").abi;
const cLumAddr = require("./artifacts/cLUMToken").networks[80001].address;

const leaABI = require("./artifacts/LEAToken").abi;
const leaAddr = require("./artifacts/LEAToken").networks[80001].address;
const cLeaABI = require("./artifacts/cLEAToken").abi;
const cLeaAddr = require("./artifacts/cLEAToken").networks[80001].address;

const gemABI = require("./artifacts/GEMToken").abi;
const gemAddr = require("./artifacts/GEMToken").networks[80001].address;
const cGemABI = require("./artifacts/cGEMToken").abi;
const cGemAddr = require("./artifacts/cGEMToken").networks[80001].address;

function App() {
  const [provider, setProvider] = useState(
    new ethers.providers.Web3Provider(window.ethereum)
  );

  const [oreContract, setOreContract] = useState(null);
  const [lumContract, setLumContract] = useState(null);
  const [leaContract, setLeaContract] = useState(null);
  const [gemContract, setGemContract] = useState(null);

  const [cOreContract, setcOreContract] = useState(null);
  const [cLumContract, setcLumContract] = useState(null);
  const [cLeaContract, setcLeaContract] = useState(null);
  const [cGemContract, setcGemContract] = useState(null);

  useEffect(() => {
    const signer = new ethers.providers.Web3Provider(
      window.ethereum
    ).getSigner();
    setProvider(provider);
    setOreContract(new ethers.Contract(oreAddr, oreABI, signer));
    setLumContract(new ethers.Contract(lumAddr, lumABI, signer));
    setLeaContract(new ethers.Contract(leaAddr, leaABI, signer));
    setGemContract(new ethers.Contract(gemAddr, gemABI, signer));

    setcOreContract(new ethers.Contract(cOreAddr, cOreABI, signer));
    setcLumContract(new ethers.Contract(cLumAddr, cLumABI, signer));
    setcLeaContract(new ethers.Contract(cLeaAddr, cLeaABI, signer));
    setcGemContract(new ethers.Contract(cGemAddr, cGemABI, signer));
    console.log(provider);
  }, []);

  window.provider = provider;
  const contracts = {
    oreContract,
    lumContract,
    leaContract,
    gemContract,
    cOreContract,
    cLumContract,
    cLeaContract,
    cGemContract,
  };

  return (
    <ProviderContext.Provider value={provider}>
      <ContractContext.Provider value={contracts}>
        <div className="App">
          <TopBar />
          <Hero />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Resources />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/crafting" element={<Crafting />} />
            </Routes>
          </Container>
        </div>
      </ContractContext.Provider>
    </ProviderContext.Provider>
  );
}

export default App;
