import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import PlayerView from "./PlayerView";
import { Row, Col, Form, Input, Button } from "antd";
function PlayerData({ onSubmit, id }) {
  const [name, setName] = useState("");

  const label = "Username";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id, name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="header" htmlFor="username"></label>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          id="name"
          placeholder="Enter github username"
          type="text"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <button
        className="btn  btn-sm"
        type="submit"
        disabled={!name}
        style={{
          width: "98px",
          marginLeft: "6px",
          backgroundColor: "#389e0d",
          color: "white",
        }}
      >
        Go
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
  //Accessing match,history props from match object
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
      ...state,
      [`${id}`]: "",
      [`${id}Img`]: null,
    });
  };
  //Destructure all the state elements
  const { playerOne, playerTwo, playerOneImg, playerTwoImg } = state;

  const BaseUrl = `${match.url}/results`;
  const FightParams = `?playerOne=${playerOne}&playerTwo=${playerTwo}`;
  const encodedParams = window.encodeURI(FightParams);
  return (
    <div>
      <Row justify="center">
        <Col span={8} offset={3}>
          {!playerOne && (
            <PlayerData
              id="playerOne"
              label="player One"
              onSubmit={handleSubmit}
            />
          )}

          {!!playerOne && !!playerOneImg && (
            <PlayerView username={playerOne} avatar={playerOneImg}>
              <Button
                type="primary"
                onClick={() => handleReset("playerOne")}
                danger
              >
                Reset
              </Button>
            </PlayerView>
          )}
        </Col>
        <Col span={8} offset={3}>
          {!playerTwo && (
            <PlayerData
              id="playerTwo"
              label="Player Two"
              onSubmit={handleSubmit}
            />
          )}
          {!!playerTwo && !!playerTwoImg && (
            <PlayerView username={playerTwo} avatar={playerTwoImg}>
              <Button
                type="primary"
                onClick={() => handleReset("playerTwo")}
                danger
              >
                Reset
              </Button>
            </PlayerView>
          )}
        </Col>
      </Row>

      {!!playerOneImg && !!playerTwoImg && (
        <Row justify="center">
          <Col>
            <Link
              className="button"
              style={{ textDecoration: "none" }}
              to={{
                pathname: BaseUrl,
                search: encodedParams,
              }}
            >
              <a href="https://www.animatedimages.org/cat-dragon-ball-z-1151.htm">
                <img
                  src="https://www.animatedimages.org/data/media/1151/animated-dragonball-z-image-0038.gif"
                  border="0"
                  alt="animated-dragonball-z-image-0038"
                />
              </a>
            </Link>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FightCom;
