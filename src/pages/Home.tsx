import React from "react";
import Container from "../components/Container";
import SiteInfo from "../constants/SiteInfo";
import FormBar from "../components/FormBar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header />
      <Container>
        <FormBar action="/data" />
        <p className="intro-text">{SiteInfo.description}</p>
      </Container>
    </div>
  );
};

export default Home;
