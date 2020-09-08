import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import PlayerView from "./PlayerView";

function PlayerData({ onSubmit, id }) {
  const [name, setName] = useState("");

  const label = "Username";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id, name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="header" htmlFor="username">
        {label}
      </label>
      <input
        id="name"
        placeholder="Enter github username"
        type="text"
        autoComplete="off"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-danger btn-sm" type="submit" disabled={!name}>
        Submit
      </button>
    </form>
  );
}

const FightCom = () => {
  const [state, setState] = useState({
    playerOne: "",
    playerTwo: "",
    playerOneImg: null,
    playerTwoImg: null,
  });

  const match = useRouteMatch();

  const handleSubmit = (id, name) => {
    setState({
      ...state,
      [`${id}`]: name,
      [`${id}Img`]: `https://github.com/${name}.png?size=200`,
    });

    console.log(id, name);
  };

  const handleReset = (id) => {
    setState({
      [`${id}Name`]: "",
      [`${id}Img`]: null,
    });
  };

  const { playerOne, playerTwo, playerOneImg, playerTwoImg } = state;
  const BaseUrl = `${match.url}/results`;
  const FightParams = `?playerOne=${playerOne}&playerTwo=${playerTwo}`;
  const encodedParams = window.encodeURI(FightParams);
  return (
    <div>
      {!playerOne && (
        <PlayerData id="playerOne" label="player One" onSubmit={handleSubmit} />
      )}
      {!!playerOne && !!playerOneImg && (
        <PlayerView username={playerOne} avatar={playerOneImg}>
          <button
            className="reset btn-success"
            onClick={() => handleReset("playerOne")}
          >
            Reset
          </button>
        </PlayerView>
      )}
      {!playerTwo && (
        <PlayerData id="playerTwo" label="Player Two" onSubmit={handleSubmit} />
      )}
      {!!playerTwo && !!playerTwoImg && (
        <PlayerView username={playerTwo} avatar={playerTwo}>
          <button className="reset" onClick={() => handleReset("playerTwo")}>
            Reset
          </button>
        </PlayerView>
      )}
      {!!playerOneImg && !!playerTwoImg && (
        <Link
          className="button"
          to={{
            pathname: BaseUrl,
            search: encodedParams,
          }}
        >
          Battle
        </Link>
      )}
    </div>
  );
};

export default FightCom;
