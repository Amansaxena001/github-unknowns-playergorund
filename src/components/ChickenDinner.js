import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { battle } from "../utils/api";
import PlayerPreview from "./PlayerPreview";
import Loading from "./Loading";
import PlayerView from "./PlayerView";

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
  } = info;
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
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: "center" }}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  );
}
Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
};

// Main
class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };
  componentDidMount = () => {
    const players = queryString.parse(this.props.location.search);
    const { playerOneName, playerTwoName } = players;
    battle([playerOneName, playerTwoName]).then((players) => {
      players
        ? this.setState(() => ({
            winner: players[0],
            loser: players[1],
            error: null,
            loading: false,
          }))
        : this.setState(() => ({
            error:
              "Looks like there was an error. Check that both users exist on Github",
            loading: false,
          }));
    });
  };
  render = () => {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

    // loading...
    if (loading) {
      return <Loading text="hee haa" speed={50} />;
    }

    // error!
    if (error) {
      return (
        <div>
          <p>{"error!"}</p>
          <p>{this.state.error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    // console.log(this.state)
    return (
      <div>
        <div className="row">
          {/*{JSON.stringify(this.state)}*/}
          <Player
            label="Winner"
            score={winner.score}
            profile={winner.profile}
          />
          <Player label="Loser" score={loser.score} profile={loser.profile} />
        </div>
        <div className="row">
          <Link className="button" to="/battle">
            Another Battle!
          </Link>
        </div>
      </div>
    );
  };
}

export default Results;
