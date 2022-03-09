import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import TopBar from "./components/TopBar";
import Resources from "./components/Resources";
import Crafting from "./components/Crafting";
import Hero from "./components/Hero";
import { ethers } from "ethers";
import ProviderContext from "./ProviderContext";

function App() {
  const [provider] = useState(
    new ethers.providers.Web3Provider(window.ethereum)
  );

  window.provider = provider;

  return (
    <ProviderContext.Provider value={provider}>
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
    </ProviderContext.Provider>
  );
}

export default App;
