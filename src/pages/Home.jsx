import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

//import url
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

//images import

const Home = () => {
  const navigate = useNavigate();
  //loading state
  const [loading, setLoading] = useState(true);
  //title state for the hero section
  const [title, setTitle] = useState(null);
  // set state of adverts / news articles
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    const endpoint = `${baseUrl}/title?_embed`;
    axios
      .get(`${endpoint}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    const advertEndpoint = `${baseUrl}/adverts?_embed`;
    axios
      .get(`${advertEndpoint}`)
      .then((res) => {
        console.log(res.data);
        setAdvert(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function getFeaturedImage(data) {
    if (
      data &&
      data._embedded &&
      data._embedded["wp:featuredmedia"] &&
      data._embedded["wp:featuredmedia"][0].source_url
    ) {
      return data._embedded["wp:featuredmedia"][0].source_url;
    } else {
      return "https://placehold.co/600x400";
    }
  }

  if (loading) {
    return <>Loading...</>;
  }

  const Titles = ({ titles }) => {
    if (!titles) {
      return null; // or return some other appropriate UI
    }

    const mappedTitles = titles.map((data, index) => {
      return (
        <div id="hero-container" key={data.id}>
          {/* hero image */}
          <img src={getFeaturedImage(data)} alt="Hero image of teamwork" />
          {/* hero title and text */}
          <div id="hero-statement-text">
            <h1 className="hero-title">{data.title.rendered}</h1>
            <h2
              className="hero-text"
              dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }}
            ></h2>
          </div>
        </div>
      );
    });

    return <>{mappedTitles}</>;
  };

  const Adverts = ({ adverts }) => {
    if (!adverts) {
      return null; // or return some other appropriate UI
    }

    const mappedAdverts = adverts.map((data, index) => (
      <div id="news-container" key={data.id}>
        {/* hero image */}
        <img
          className="news-image"
          src={getFeaturedImage(data)}
          alt="Hero image of teamwork"
        />
        {/* hero advert and text */}
        <div id="news-statement-text">
          <h3 className="news-advert">{data.title.rendered}</h3>
          <p
            className="news-text"
            dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }}
          ></p>
        </div>
      </div>
    ));

    return <>{mappedAdverts}</>;
  };

  return (
    <>
      <Helmet>
        <title>The Broken Movement Trust</title>
        <meta name="description" content="This is my home page description" />
        <meta name="keywords" content="contact, donate, events" />
        {/* can use additional meta tags eg. twitter/social media share tags */}
        {/* you can go to twitter to see how to do the mark ups for there meta tags. */}
        {/* example for facebook below  og = open graph*/}
        <meta
          property="og:title"
          content="Facebook open graph meta tag example"
        />
        <meta property="og:image" content="picture of people" />
      </Helmet>

      {loading ? <p>Loading...</p> : <Titles titles={title} />}
      <h2 className="news-header">Latest News & Events</h2>
      <div id="news-grid-container">
        {loading ? <p>Loading...</p> : <Adverts adverts={advert} />}
      </div>
      <div className="help-donate-grid-container">
        <div className="help-item">
          <h2 className="grid-item-title">Want to help?</h2>
          <h4 className="home-grid-text">
            If you would like to help support The Broken Movement Trust, we
            would love to hear from you.
          </h4>
          <button
            className="help-home-buttons"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </div>
        <div className="donate-item">
          <h2 className="grid-item-title">Donate!</h2>
          <h4 className="home-grid-text">
            Thanks to the generous support of donors, we can support local
            initiatives, providing education and opportunity for the community.
          </h4>
          <button
            className="help-home-buttons"
            onClick={() => navigate("/donationfront")}
          >
            Donate Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
