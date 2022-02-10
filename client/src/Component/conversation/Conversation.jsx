import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
export default function Conversation({ conversation, currentUser }) {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setuser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
        alt=""
      />
      <span className="conversationName">{user.userName}</span>
    </div>
  );
}
