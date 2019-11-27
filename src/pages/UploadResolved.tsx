import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";

const UploadResolved = () => {
  return (
    <>
      <Header />
      <Container>
        <div id="uploaded">
          <h3>Images Uploaded</h3>
          <p>Please check the output folder for the images.</p>
        </div>
      </Container>
    </>
  );
};

export default UploadResolved;
