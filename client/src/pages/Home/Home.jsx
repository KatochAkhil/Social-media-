import React from "react";
import "./Home.css";
import Topbar from "../../Component/Topbar/Topbar";
import Sidebar from "../../Component/sidebar/sidebar";
import Feed from "../../Component/feed/Feed";
import Rightbar from "../../Component/rightbar/Rightbar";

function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}

export default Home;
