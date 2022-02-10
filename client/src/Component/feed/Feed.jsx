import React, { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import SharePost from "../share/Share";
import "./style.css";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);

      setPosts(res.data);
    };
    fetchData();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <SharePost />
        {posts.map((item) => (
          <Post key={item._id} post={item} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
