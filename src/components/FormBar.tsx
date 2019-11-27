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
          placeholder="Type your search"
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
