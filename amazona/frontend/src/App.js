import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import About from "./screens/About";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div className="menu">
            <Link to="/">Dressfair</Link>
            <div className="second-menu">
              <Link to="About">About</Link>
              <Link to="About">Contact</Link>
              <Link to="About">Service</Link>
              <Link to="About">Portfolio</Link>
            </div>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
