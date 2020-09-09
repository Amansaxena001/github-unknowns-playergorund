import axios from "axios";
require("dotenv").config();

//GIT HUB API CALLS
const ID = process.env.REACT_APP_CLIENT_ID;
const SECRET = process.env.REACT_APP_CLIENT_SECRET;
const getUser = () => {
  return {
    id: ID,
    secret: SECRET,
  };
};
const { id, secret } = getUser();

//apply params to URL
const params = `client_id=${id}&client_secret=${secret}`;

//Get user profiles

const getProfile = (username) => {
  return axios
    .get(`https://api.github.com/users/${username}${params}`)
    .then((user) => user.data);
};

//Get user repos

const getRepo = (username) => {
  return axios
    .get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then((user) => user.data);
};

//Get user REPO stars
const getStars = (repo) => {
  return repo.reduce((count, { star_count }) => count + star_count, 0);
};

//calculate USER score on the basis of above data
const finalScore = ({ followers }, repos) => {
  return followers * 3 + getStars(repos);
};

const getUserData = (player) => {
  return Promise.all([getProfile(player), getRepo(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: finalScore(profile, repos),
    })
  );
};

// who is the winner
function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

function handleError(error) {
  console.warn(error);
  return null;
}
// battle!
export function battle(players) {
  return Promise.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
}

export function fetchRepo(language) {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:` +
      `${language}&sort=stars&order=desc&type=Repositories`
  );

  return axios.get(encodedURI).then((response) => response.data.items);
}
