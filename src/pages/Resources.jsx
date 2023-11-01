import { useState, useEffect } from "react";
import axios from "axios";

// import hero image
import helping from "/img/helping.jpg";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;
console.log(baseUrl);

const Resources = () => {
  //set state for loading and resources / helplines
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState(null);

  const endpoint = `${baseUrl}/resources?_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        console.log(res.data);
        setResources(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const Resources = ({ resources }) => {
    const mappedResources = resources.map((resource, index) => {
      return (
        <div key={resource.slug + "-" + index} className="resource-container">
          <h4 className="resource-title">{resource.title.rendered}</h4>
          <div
            dangerouslySetInnerHTML={{ __html: resource.excerpt.rendered }}
          ></div>
          <li>
            <a className="more-info-btn" href={`#/resources/${resource.id}`}>
              More Info
            </a>
          </li>
        </div>
      );
    });
    return <>{mappedResources}</>;
  };

  return (
    <>
      <div id="contact-hero-container">
        <img src={helping} alt="Helping heart image" />
      </div>

      <div id="donation-page" className="container">
        <h2 className="page-title">Resources</h2>
        <div id="resource-grid" className="grid-container">
          {loading ? <p>Loading...</p> : <Resources resources={resources} />}
        </div>
      </div>
    </>
  );
};

export default Resources;
