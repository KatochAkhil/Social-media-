import React from "react";
import "./style.css";

function Closefriend({ user }) {
  return (
    <li className="sidebarFriend">
      <img
        src={user.profilePicture}
        alt="profile"
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendname">{user.username}</span>
    </li>
  );
}

export default Closefriend;
