import React from "react";

function PlayerView({ avatar, name, children }) {
  return (
    <div>
      <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
      <h2 className="username">{`@${name}`}</h2>
      {children}
    </div>
  );
}

export default PlayerView;
