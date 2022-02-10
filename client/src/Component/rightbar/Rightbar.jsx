import React, { useEffect, useState } from "react";
import "./style.css";
import { Users } from "../dummydata";
import Online from "../online/Online";
import axios from "axios";

function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="./images/person.jpg" alt="person" className="birthdayImg" />
          <span className="birthdayText">
            <b>New user</b> and 3 others friends
          </span>
        </div>
        <img src="./images/person.jpg" alt="person" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        <h3 className="rightbarTitle">User Information</h3>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">relationShip:</span>
            <span className="rightbarInfoValue">
              {user.relationShip === 1
                ? "Single"
                : user.relationShip === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=826"
              alt="person"
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingname">User Admin</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightBar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
