import React, { useState, useEffect } from "react";
import "./style.css";
import Topbar from "../../Component/Topbar/Topbar";
import Sidebar from "../../Component/sidebar/sidebar";
import Feed from "../../Component/feed/Feed";
import Rightbar from "../../Component/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchData();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverImage
                    ? user.coverImage
                    : "http://localhost:3000/images/person.jpg"
                }
                alt="person-profile"
              />
              <img
                className="profileUserImg"
                src={
                  user.profileImage
                    ? user.profileImage
                    : "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
                }
                alt="profileUser"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.userName}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
