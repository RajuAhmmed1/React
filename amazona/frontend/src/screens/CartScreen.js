import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state; //here state is destructure object which have initialsate object value

  //note: map shows data induvidually as per the id, so when updatehandler fucntion triggers it takes that's product id only
  const updateCartHandler = async (item, quantity) => {
    //console.log(item);
    try {
      const { data } = await axios.get(`/api/products/${item._id}`); //getting data from the api as per the cart's product id
      console.log(data);
      if (data.countInStock < quantity) {
        window.alert("Sorry. Product is out of stock");
        console.log("out of stock");
        return;
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }

    cxtDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeProductHandler = (item) => {
    cxtDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty.<Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((a) => (
                <ListGroup.Item key={a._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={a.image}
                        alt={a.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/products/${a.slug}`}>{a.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => updateCartHandler(a, a.quantity - 1)}
                        variant="light"
                        disabled={a.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{a.quantity}</span>{" "}
                      <Button
                        onClick={() => updateCartHandler(a, a.quantity + 1)}
                        variant="light"
                        disabled={a.quantity === a.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${a.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeProductHandler(a)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    Items): $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
