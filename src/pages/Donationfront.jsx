import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//import image for header
import helping from "/img/helping.jpg";

//Product Endpoint from our env
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const Donationfront = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${productsUrl}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //function to format the prices
  const formatPrice = (price) => {
    //divide the price by 100 and format it with two decimal places
    return (price / 100).toFixed(2);
  };

  const Products = ({ products }) => {
    console.log({ products });
    const mappedProducts = products.map((product, index) => {
      function getFeaturedImage(product) {
        if (product && product.images && product.images[0]) {
          return product.images[0].src;
        } else {
          return "https://placeholder.co/600x400";
        }
      } //end of featured image function

      return (
        <div className="donation-container item-container" key={index}>
          <img
            className="donation-image"
            src={getFeaturedImage(product)}
            alt="Donation symbol image"
          />
          <Link className="donation-link" to={`/donationproduct/${product.id}`}>
            <h3 className="name">{product.name}</h3>
          </Link>
          <h4 className="name">
            ${formatPrice(product.prices.regular_price)}{" "}
            {product.prices.currency_code}
          </h4>
        </div>
      ); //end of map return
    }); //end of map

    //return the products!
    return <>{mappedProducts}</>;
  }; //end of products

  // donationfront page return
  return (
    <>
      <div id="contact-hero-container">
        <img src={helping} alt="Helping heart image" />
      </div>
      <div id="donation-page" className="container">
        <h2 className="page-title">Donatations</h2>
        <div id="product-grid" className="grid-container">
          {loading ? <p>Loading...</p> : <Products products={products} />}
        </div>
      </div>
    </>
  );
};

export default Donationfront;
