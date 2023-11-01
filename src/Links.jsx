import { Route, Routes } from "react-router-dom";

//import of pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Donationfront from "./pages/Donationfront";

//import of components
import Resource from "./components/Resource";
import ResourcesViaHelplines from "./pages/ResourcesViaHelplines";
import Donationproduct from "./components/Donationproduct";

const Links = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resources/:id" element={<Resource />} />
      <Route path="/helpline/:id" element={<ResourcesViaHelplines />} />
      {/* donation shop */}
      <Route path="/donationfront" element={<Donationfront />} />
      <Route path="/donationproduct/:id" element={<Donationproduct />}></Route>
    </Routes>
  );
};

export default Links;
