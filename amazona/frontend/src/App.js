import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import About from "./screens/About";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Dressfair</Navbar.Brand>
              </LinkContainer>
            </Container>
            {/* <div className="second-menu">
              <Link to="About">About</Link>
              <Link to="About">Contact</Link>
              <Link to="About">Service</Link>
              <Link to="About">Portfolio</Link>
            </div> */}
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/About" element={<About />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved!</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
