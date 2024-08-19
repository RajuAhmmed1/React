import data from "../data";

function HomeScreen() {
  return (
    <div className="products">
      {data.products.map((prod) => (
        <div className="product">
          <img src={prod.image} alt={prod.name}></img>
          <div className="product-info">
            <p>{prod.name}</p>
            <p>${prod.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default HomeScreen;
