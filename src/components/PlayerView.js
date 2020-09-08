import React from "react";

function PlayerView({ avatar, username, children }) {
  return (
    <div>
      <img className="avatar" src={avatar} alt={`Avatar for ${username}`} />
      <h2 className="username">{`@${username}`}</h2>
      {children}
    </div>
  );
}

export default PlayerView;
