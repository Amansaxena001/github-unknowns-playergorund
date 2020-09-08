import React from "react";
import { Link } from "react-router-dom";
function HomeCom() {
  return (
    <div className="container">
      <p className="h3 text-center m-2">Github</p>
      <h1 className="display-4 text-center m-2">Unknowns Playerground</h1>
      <center>
        <Link className="btn  btn-block btn-danger m-2 mt-2 " to="/fight">
          Begin
        </Link>
      </center>
    </div>
  );
}

export default HomeCom;
