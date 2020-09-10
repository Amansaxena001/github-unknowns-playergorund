import React from "react";
import { Link } from "react-router-dom";
function HomeCom() {
  return (
    <div className="container">
      {<br></br>}
      {<br></br>}
      {<br></br>}
      {<br></br>}
      {<br></br>}
      {<br></br>}
      {<br></br>}
      {<br></br>}
      {<br></br>}

      <p
        className="h3 text-center m-2"
        style={{ fontSize: "54px", fontWeight: "bolder" }}
      >
        Github
      </p>

      <h1 className="display-4 text-center m-2">Unknowns Playerground</h1>
      <center>
        <Link className="btn  btn-block btn-danger m-2 mt-2 " to="/fight">
          Begin
        </Link>
        <small
          id="emailHelp"
          style={{ fontStyle: "italic" }}
          className="form-text text-muted"
        >
          Inspired By FAUG an Indian esports revolution.
        </small>
      </center>
    </div>
  );
}

export default HomeCom;
