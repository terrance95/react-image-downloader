import React from "react";
import SiteInfo from "../constants/SiteInfo";

export default function FormBar({ action }: { action: string }) {
  function test() {}

  return (
    <>
      <form className="doi-form" action={action} method="POST">
        <h1 className="ml10 site-title">{SiteInfo.title}</h1>
        <input
          type="text"
          name="data"
          id="data"
          placeholder="Ex: s41928-019-0290-6 s41928-019-0284-4 s41928-019-0285-3"
          required
        />

        <button
          type="submit"
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        >
          Submit
        </button>
      </form>
    </>
  );
}
