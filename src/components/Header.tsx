import React from "react";
import SiteInfo from "../constants/SiteInfo";

export default function Header() {
  return (
    <>
      <header>
        <div className="mdl-layout__header-row">
          <i className="material-icons" id="logo-icon">
            {SiteInfo.logo}
          </i>
          <span id="site-title" className="mdl-layout-title">
            {SiteInfo.title}
          </span>

          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    </>
  );
}
