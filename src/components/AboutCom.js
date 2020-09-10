import React from "react";

function AboutCom() {
  return (
    <div class="jumbotron bg-transparent">
      <h1 class="display-4">About the App</h1>
      <p class="lead">
        This is a game based App where developers can compare two Github
        profiles.
      </p>
      <hr class="my-4" />
      <h6>
        It utilizes Github API for fetching users data and calculating scores
        based on factors such as followers, stars, etc.
      </h6>
      <br></br>
      <br></br>
      <p style={{ color: "red", fontWeight: "bolder" }}>
        This App is for educational purpose and if you want to contribute you
        are welcome.
      </p>
      <a href="https://github.com/Amansaxena001">
        <img
          width="100px"
          height="100px"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          border="0"
        />
      </a>
    </div>
  );
}

export default AboutCom;
