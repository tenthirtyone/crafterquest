import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import TopBar from "./components/TopBar";
import Resources from "./components/Resources";
import Recipes from "./components/Recipes";
import Inventory from "./components/Inventory";
import Hero from "./components/Hero";
function App() {
  return (
    <div className="App">
      <TopBar />
      <Hero />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Resources />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
