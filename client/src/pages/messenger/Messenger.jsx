import React, { useContext, useState, useEffect } from "react";
import Chatonline from "../../Component/chatonline/Chatonline";
import Conversation from "../../Component/conversation/Conversation";
import Message from "../../Component/Message/Message";
import Topbar from "../../Component/Topbar/Topbar";
import { AuthContext } from "../../context/Authcontext";
import "./style.css";
import axios from "axios";

function Messenger() {
  const [conversation, setConversation] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversation.map((conv) => (
              <Conversation
                key={conv._id}
                conversation={conv}
                currentUser={user}
              />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Write Message"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Chatonline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
