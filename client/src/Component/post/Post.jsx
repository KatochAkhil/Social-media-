import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [islike, setIsLike] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/users/?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchData();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(islike ? like - 1 : like + 1);
    setIsLike(!islike);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.userName}`}>
              <img
                className="postProfileImg"
                src={
                  user.profileImage ||
                  "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
                }
                alt="profileImage"
              />
            </Link>
            <span className="postUsername">{user.userName}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img
            className="postImg"
            src={
              post.image ||
              "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=826"
            }
            alt="postImage"
          />
          {/* https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740 */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={likeHandler}
              className="likeIcon"
              src="http://localhost:3000/images/like.png"
              alt="like"
            />
            <img
              className="likeIcon"
              src="http://localhost:3000/images/heart.png"
              onClick={likeHandler}
              alt="unlike"
            />
            <span className="postLikeCounter">{like} pepole like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
