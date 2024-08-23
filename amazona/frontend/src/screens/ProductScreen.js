import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Rating from "../components/Rating";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../untils";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_request":
      return { ...state, loading: true };
    case "fetch_success":
      return { ...state, products: action.payload, loading: false };
    case "fetch_fail":
      console.error("Error fetching data:", action.payload); // For debugging

      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function ProductScreen() {
  const { slug } = useParams();

  const [{ error, products, loading }, dispatch] = useReducer(reducer, {
    error: "",
    products: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "fetch_request" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "fetch_success", payload: result.data });
      } catch (err) {
        dispatch({ type: "fetch_fail", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: cxtDispatch } = useContext(Store);
  const addToCartHandler = () => {
    cxtDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...products, quantity: 1 },
    });
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="image-large"
            src={products.image}
            alt={products.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variante="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{products.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={products.rating}
                numReviews={products.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <p>${products.price}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              Description: <p>{products.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variante="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${products.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {products.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {products.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Card
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
