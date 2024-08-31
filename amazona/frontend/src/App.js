import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import About from "./screens/About";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import { Link } from "react-router-dom";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Dressfair</Navbar.Brand>
              </LinkContainer>
              <Nav className="nav-link">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
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
          <Container className="mt-5">
            <Routes>
              <Route path="/products/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
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
