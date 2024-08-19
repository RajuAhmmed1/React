import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_request":
      return { ...state, loading: true };
    case "fetch_success":
      return { ...state, products: action.payload, loading: false };
    case "fetch_fail":
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

  const [color, setColor] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "fetch_request" });
      const result = await axios.get("/api/products");
      try {
        dispatch({ type: "fetch_success", payload: result.data });
      } catch (error) {
        dispatch({ type: "fetch_fail", payload: error.message });
      }
    };
    fetchData();
  }, []);
  const prods = products.find((prod) => prod.slug === slug);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          fontSize: "28px",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!prods) {
    return <h1> </h1>;
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="singleProduct">
          <div className="singleProductImage">
            <img src={prods.image} alt={prods.name} />
          </div>
          <div className="singleProductInfo">
            <h1>{prods.name}</h1>
            <p>
              <strong>${prods.price}</strong>
            </p>
            <p>{prods.category}</p>
            <p>{prods.contInStock}</p>

            <p>{prods.descrition}</p>
            <button
              className={`singeProductButton ${color}`}
              onClick={() => {
                setColor("red");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
      ;
    </>
  );
}

export default ProductScreen;
