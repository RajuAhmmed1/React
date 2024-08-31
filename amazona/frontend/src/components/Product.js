import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { useContext } from "react";
import axios from "axios";
import { Store } from "../Store";

function Products({ product }) {
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state; //here state is destructure object which have initial state value

  // Check if the product is already in the cart
  const existItem = cartItems.find((x) => x._id === product._id);
  const quantityInCart = existItem ? existItem.quantity : 0;

  const addCartHandler = async (item) => {
    const quantity = quantityInCart + 1;
    const { data } = await axios.get(`/api/products/${item._id}`); //getting data from the api as per the cart's product id
    console.log(data);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      console.log("out of stock");
      return;
    }

    cxtDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product">
      <Link to={`/products/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <div className="product-info">
          <Link to={`/products/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <Card.Text>${product.price}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            //here product is passing the certain product's Id as parameter
            //parameter is only used during passing the value to the method which works dinamically on the value of parameter
            <Button onClick={() => addCartHandler(product)}>Add to cart</Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Products;
