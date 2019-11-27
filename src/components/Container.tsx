import React from "react";

interface SectionList {
  children: any;
}
const Container: React.SFC<SectionList> = ({ children }) => {
  return (
    <>
      <main className="mdl-layout__content">
        <div className="page-content">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Container;
