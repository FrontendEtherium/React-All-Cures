import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { backendHost } from "../../api-config";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { userId } from "../UserId";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ChatWindow from "../Profile/ChatWindow";
import { userAccess } from "../UserAccess";

import "./ChatList.css";

export default function App(usr_id) {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [alert, setAlert] = useState();
  const [chats, setChats] = useState([]);
  const [first, setFirst] = useState([]);
  const [last, setLast] = useState([]);
  const [header, setHeader] = useState(false);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(false);

  const fromId = userId;
  const [toId, setToId] = useState();
  const [showChatWindow, setShowChatWindow] = useState(false);
  const chatRef = useRef(null);
  const [chatId, setChatId] = useState(null);

  const docID = localStorage.getItem("doctorid");

  useEffect(() => {
    axios
      .get(`${backendHost}/chat/list/${docID == 0 ? userId : docID}`)
      .then((response) => {
        setChatList(response.data);
      })
      .catch(console.error);
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  });

  const checkChat = (getId) => {
    axios
      .get(
        `${backendHost}/chat/${userAccess != 1 ? userId : getId}/${
          userAccess != 1 ? getId : docID
        }`
      )
      .then((res) => {
        setChatId(res.data[0].Chat_id);
        setToId(getId);
        setChats(res.data);
        startWebSocket(res.data[0].Chat_id);
      })
      .catch(console.error);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const newChat = {
      Message: message,
      From_id: docID == 0 ? userId : docID,
    };
    setNewMessage(true);
    setChats((prev) => [...prev, newChat]);

    const chatId = chats[0].Chat_id;
    const newMessage = `${newChat.From_id}:${toId}:${chatId}:${message}`;
    socket.send(newMessage);
    setMessage("");
    scrollToBottom();
  };

  const startWebSocket = (getChatId) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }

    const ws = new WebSocket("wss://uat.all-cures.com:8000");

    ws.onopen = () => {
      ws.send(`{"Room_No":"${getChatId}"}`);
    };

    ws.onmessage = (event) => {
      const [from, ...rest] = event.data.split(":");
      const receivedMessage = rest.join(":");
      const newChat = { Message: receivedMessage, From_id: from };
      setChats((prev) => [...prev, newChat]);
    };

    ws.onclose = (event) => {
      console.log(
        event.wasClean
          ? `[close] code=${event.code} reason=${event.reason}`
          : "[close] Connection died"
      );
    };

    setSocket(ws);
  };

  const handleClick = (chat) => {
    checkChat(chat.User);
    setSelectedChat(chat.User);
    setFirst(chat.first_name);
    setLast(chat.last_name);
    setHeader(true);
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="border">
          <div className="container">
            <div className="chat">
              <div className="message-header">
                <FontAwesomeIcon icon={faInbox} size="3x" />
                <div className="header-info">
                  <h3 style={{ color: "#00415e", marginLeft: 20 }}>Inbox</h3>
                </div>
              </div>

              <div className="chat-list">
                {chatList.map((user) => (
                  <div
                    key={user.User}
                    onClick={() => handleClick(user)}
                    className={`chat-item ${
                      selectedChat === user.User ? "selected-chat" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faUserCircle} size="3x" />
                    <div className="chat-info" style={{ marginLeft: 20 }}>
                      <h3>
                        {user.first_name} {user.last_name}
                      </h3>
                      <p>{user.Message}</p>
                    </div>
                    <div className="chat-time">
                      {dayjs(user.Time).format("h:mm A")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="message">
              <div
                className="message-header"
                style={{ display: header ? "flex" : "none" }}
              >
                <FontAwesomeIcon icon={faUserCircle} size="3x" />
                <div className="header-info">
                  <h3 style={{ color: "#00415e", marginLeft: 20 }}>
                    {first} {last}
                  </h3>
                </div>
              </div>

              <div className="message-list" ref={chatRef}>
                {chats.map((msg, i) => {
                  const isSender = msg.From_id === userId;
                  return (
                    <div
                      key={i}
                      className={`message-item ${
                        isSender ? "sender-message" : "receiver-message"
                      }`}
                    >
                      <p
                        className="message-text"
                        style={{
                          color: isSender ? "#fff" : "#000",
                        }}
                      >
                        {msg.Message}
                        <span
                          className="message-time"
                          style={{
                            color: isSender ? "#fff" : "#000",
                          }}
                        >
                          {dayjs(msg.Time).format("h:mm A")}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="message-footer"
                style={{ display: header ? "flex" : "none" }}
              >
                <form onSubmit={sendMessage}>
                  <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
