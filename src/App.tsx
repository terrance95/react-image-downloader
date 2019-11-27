import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import { Router, RouteComponentProps } from "@reach/router";
import UploadResolved from "./pages/UploadResolved";

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

function App() {
  return (
    <Router>
      <RouterPage path="/" pageComponent={<Home />} />
      <RouterPage path="/data" pageComponent={<UploadResolved />} />
    </Router>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
