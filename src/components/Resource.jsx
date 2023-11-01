import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

// helplines is the taxonomy name
const Helplines = ({ resource }) => {
  //set state for taxonomies
  const [taxonomies, setTaxonomies] = useState([]);

  useEffect(() => {
    if (!resource) {
      return;
    }

    const taxonomyEndpoint = resource._links["wp:term"][0].href;

    axios
      .get(`${taxonomyEndpoint}`)
      .then((res) => {
        console.log("resource taxonomy call");
        setTaxonomies(res.data);
      })
      .catch((err) => console.log(err));
  }, [resource]);

  const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
    return (
      <Link to={`/helpline/${taxonomy.id}`} key={index}>
        <span className="taxonomy-term-pill">{taxonomy.name} </span>
      </Link>
    );
  });

  return <div>{renderedTaxonomies}</div>;
};

const Resource = () => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();

  const endpoint = `${baseUrl}/resources/${id}?_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        console.log(res.data);
        setResource(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="res-container">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft />
        Go Back
      </button>
      <div key={resource.slug} className="resource-container">
        <h4 className="title">{resource.title.rendered}</h4>
        <Helplines resource={resource} />
        <div
          dangerouslySetInnerHTML={{ __html: resource.content.rendered }}
        ></div>
      </div>
    </div>
  );
};

export default Resource;
