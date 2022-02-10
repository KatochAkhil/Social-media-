import React, { useContext } from "react";
import "./Topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";

function Topbar() {
  const { user } = useContext(AuthContext);


  return (
    <>
      <div className="topbarcontainer">
        <div className="topbarLeft">
          <Link to="/">
            <span className="logo">Social Media</span>
          </Link>
        </div>
        <div className="topbarcenter">
          <div className="searchbar">
            <SearchIcon />
            <input
              placeholder="Search Here for another Person"
              type="text"
              className="searchinput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarlink">Hompage</span>
            <span className="topbarlink">TimeLine</span>
          </div>
          <div className="topbarIcons">
            <div className="topbariconItem">
              <PersonIcon />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbariconItem">
              <ChatBubbleIcon />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbariconItem">
              <NotificationsIcon />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.userName}`}>
            <img
              src={
                user.profileImage
                  ? user.profileImage
                  : "http://localhost:3000/images/person.jpg" 
              }
              className="topbarImg"
              alt="icon"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Topbar;
