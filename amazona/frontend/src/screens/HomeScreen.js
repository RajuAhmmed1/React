import { Link } from "react-router-dom";
import data from "../data";
function HomeScreen() {
  return (
    <div>
      <h1 className="product-type">Featured Products</h1>
      <div className="products">
        {data.products.map((prod) => (
          <div className="product" key={prod.slug}>
            <Link to={`/product/${prod.slug}`}>
              <img src={prod.image} alt={prod.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${prod.slug}`}>
                <p>{prod.name}</p>
              </Link>
              <p>
                <strong>${prod.price}</strong>
              </p>
              <button className="product-button">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
