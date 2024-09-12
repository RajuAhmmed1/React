import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/slug/:slug", (req, res) => {
  const singleProduct = data.products.find(
    (prod) => prod.slug === req.params.slug
  );
  if (singleProduct) {
    res.send(singleProduct);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

app.get("/api/products/:id", (req, res) => {
  const singleProduct = data.products.find(
    (prod) => prod._id === req.params.id
  );
  if (singleProduct) {
    res.send(singleProduct);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
