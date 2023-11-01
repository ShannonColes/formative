import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const HelplineName = ({ helpline }) => {
  return (
    <>
      <h3>Helpline: {helpline.name}</h3>
    </>
  );
};

const AllResourcesInHelpline = ({ params }) => {
  const [resources, setResources] = useState([]);
  const endpoint = `${baseUrl}/resources?helpline=${params.id}&_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        setResources(res.data);
      })
      .catch((err) => console.log(err));
  }, [endpoint]);

  const renderedResources = resources.map((resource, index) => {
    return (
      <div className="resource-container item-container" key={index}>
        <Link className="resource-link" to={`/resources/${resource.id}`}>
          <h4 className="name">{resource.title.rendered}</h4>
        </Link>
      </div>
    );
  });
  return <>{renderedResources}</>;
};

const ResourcesViaHelplines = () => {
  const [helpline, setHelpline] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const helplineEndpoint = `${baseUrl}/helpline/${params.id}`;

  useEffect(() => {
    axios
      .get(`${helplineEndpoint}`)
      .then((res) => {
        setHelpline(res.data);
      })
      .catch((err) => console.log(err));
  }, [helplineEndpoint]);

  return (
    <div id="resource-via-helpline" className="resource-container">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft />
        Go Back
      </button>
      <HelplineName helpline={helpline} />
      <div id="resources-grid" className="grid-container">
        <AllResourcesInHelpline params={params} />
      </div>
    </div>
  );
};

export default ResourcesViaHelplines;
