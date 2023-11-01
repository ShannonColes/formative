import { useState, useEffect } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//product Url
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const Donationproduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${productsUrl}/${id}`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [endpoint]);

  function getFeaturedImage(product) {
    if (product && product.images && product.images[0]) {
      return product.images[0].src;
    } else {
      return "https://placehold.co/600x400";
    }
  } //end of getfeatured image function

  if (loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  } //end of the image function

  //function to format the price decimal
  const formatPrice = (price) => {
    //divide by 100 an format with 2 decimal places
    return (price / 100).toFixed(2);
  };

  return (
    <div id="donation-page" className="container">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft />
        Go Back
      </button>
      <div className="donation-container item-container">
        <img
          className="donation-image"
          src={getFeaturedImage(product)}
          alt="Donation image"
        />
        <h3 className="name">{product.name}</h3>
        <h4 className="price-donation">${formatPrice(product.prices.price)}</h4>
        <div
          id="donation-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <button className="donate-button">Donate</button>
      </div>
    </div>
  );
};

export default Donationproduct;
