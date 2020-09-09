import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { battle } from "../utils/apiCalls";
import PlayerView from "./PlayerView";
import { Spin, Space, Row, Col } from "antd";

// Private
function Profile({ info }) {
  const {
    login,
    avatar_url,
    name,
    location,
    company,
    followers,
    following,
    public_repos,
    blog,
  } = info || {};
  return (
    <PlayerView username={login} avatar={avatar_url}>
      <ul className="space-list-items">
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && (
          <li>
            <a href={blog}>{blog}</a>
          </li>
        )}
      </ul>
    </PlayerView>
  );
}
Profile.propTypes = {
  info: PropTypes.object.isRequired,
};
// Private
function Player({ label, score, profile }) {
  return (
    <div>
      <h1
        style={{ textAlign: "center", fontSize: "54px", fontWeight: "bolder" }}
      >
        {label}
      </h1>
      <h3 style={{ textAlign: "center", fontSize: "18px" }}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  );
}
// Player.propTypes = {
//   label: PropTypes.string.isRequired,
//   score: PropTypes.number.isRequired,
//   profile: PropTypes.object.isRequired,
// };
// Main component
class ChickednDinner extends React.Component {
  state = {
    winner: 0,
    loser: 0,
    error: null,
    loading: false,
  };
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    const { playerOne, playerTwo } = players;
    battle([playerOne, playerTwo]).then((players) => {
      players
        ? this.setState(() => ({
            winner: players[0],
            loser: players[1],
            error: null,
            loading: true,
          }))
        : this.setState(() => ({
            error:
              "Looks like there was an error. Check that both users exist on Github",
          }));
    });
    console.log(players);
  }
  render = () => {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.loading;

    if (loading) {
      return (
        <Space>
          <Spin size="large" />
        </Space>
      );
    }
    // error!

    if (error) {
      return (
        <div>
          <p>{"error!"}</p>
          <p>{this.state.error}</p>
          <Link to="/fight">Reset</Link>
        </div>
      );
    }
    return (
      <div>
        <Row justify="center">
          <Col>
            <Player
              label="Winner"
              score={winner.score}
              profile={winner.profile}
            />
          </Col>
          <Col offset={6}>
            <Player label="Loser" score={loser.score} profile={loser.profile} />
          </Col>
        </Row>
        <Row justify="center">
          <Link className="button" to="/fight">
            <a href="https://www.animatedimages.org/cat-dragon-ball-z-1151.htm">
              <img
                src="https://www.animatedimages.org/data/media/1151/animated-dragonball-z-image-0005.gif"
                border="0"
                alt="animated-dragonball-z-image-0005"
              />
            </a>
          </Link>
        </Row>
        {<br></br>}
        <p
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: "red",
            fontSize: "64px",
            marginLeft: "10px",
          }}
        >
          Another battle !
        </p>
      </div>
    );
  };
}
export default ChickednDinner;
