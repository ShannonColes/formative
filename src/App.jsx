import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import useCustomiser from "./Hooks.jsx/useCustomiser";

// imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import Links from "./Links";

function App() {
  const { bgColor, fontFamily, navColor, footerColor } = useCustomiser();

  useEffect(() => {
    //apply the bg color to our body element
    document.body.style.backgroundColor = `#${bgColor}`;

    //change the font based on the returned value
    if (fontFamily === "Roboto") {
      document.body.style.fontFamily = `'Roboto', sans-serif`;
    }

    if (fontFamily === "Poppins") {
      document.body.style.fontFamily = `'Poppins', sans-serif`;
    }

    if (fontFamily === "DotGothic") {
      document.body.style.fontFamily = `'DotGothic16', sans-serif`;
    }

    // change nav color
    document.getElementById("topnav").style.backgroundColor = `${navColor}`;

    // change nav color
    document.getElementById(
      "footer-container-grid"
    ).style.backgroundColor = `${footerColor}`;
  }, [bgColor, fontFamily, navColor, footerColor]);

  return (
    <div className="app">
      <HashRouter>
        <Header />
        <Links />
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
