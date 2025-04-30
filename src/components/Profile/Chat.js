import React, { useState, useRef, useEffect } from "react";
import { backendHost } from "../../api-config";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import ChatWindow from "./ChatWindow";
import axios from "axios";
import { userId } from "../UserId";
import dayjs from "dayjs";

import "./ChatPopup.css";

function ChatButton(props) {
  const { items } = props;
  const [alert, setAlert] = useState();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [socket, setSocket] = useState(null);
  const chatRef = useRef(null);
  const fromId = userId;
  const searchParams = new URLSearchParams(window.location.search);
  const docid = searchParams.get("docid");
  const [toId, setToId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [newMessage, setNewMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const checkChat = () => {
    axios
      .get(`${backendHost}/chat/${userId}/${props.docid}`)
      .then((res) => {
        const fetchedChatId = res.data[0].Chat_id;

        if (fetchedChatId == null) {
          favouriteForm();
          return;
        }

        setChatId(fetchedChatId);
        setAlert("Chat already exists");
        setChats(res.data);

        const ws = new WebSocket("wss://uat.all-cures.com:8000");
        ws.onopen = () => {
          ws.send(`{"Room_No":"${fetchedChatId}"}`);
        };
        ws.onmessage = (event) => {
          const [from, ...rest] = event.data.split(":");
          const receivedMessage = rest.join(":");
          setChats((prev) => [
            ...prev,
            { Message: receivedMessage, From_id: from },
          ]);
        };
        ws.onclose = (event) => {
          console.log(
            event.wasClean
              ? `[close] code=${event.code} reason=${event.reason}`
              : "[close] Connection died"
          );
        };
        setSocket(ws);
      })
      .catch(console.error);
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
      setChats((prev) => [
        ...prev,
        { Message: receivedMessage, From_id: from },
      ]);
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

  const favouriteForm = () => {
    axios
      .post(`${backendHost}/chat/start/${userId}/${props.docid}`)
      .then((res) => {
        const newChatId = res.data[0].Chat_id;
        setChatId(newChatId);
        setToId(props.docid);
        setChats([]);
        startWebSocket(newChatId);
      })
      .catch(console.error);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage(e);
  };

  const toggleChatBox = () => {
    setIsOpen((open) => !open);
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      const newChat = { Message: message, From_id: userId };
      setChats((prev) => [...prev, newChat]);
      const newMessageStr = `${fromId}:${props.docid}:${chatId}:${message}`;
      socket.send(newMessageStr);
      setMessage("");
    } else {
      console.log("WebSocket connection not available.");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOpen) checkChat();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="favouriteForm">
        <div className={`chat-box-container ${isOpen ? "open" : ""}`}>
          <button
            type="button"
            className="toggle-button"
            onClick={toggleChatBox}
            style={{ marginTop: -290, width: 400 }}
          >
            <div className="d-flex align-items-center">
              {props.imageURL && (
                <img
                  src={props.imageURL}
                  alt="Chat Icon"
                  style={{ width: 20, marginRight: 10 }}
                />
              )}
              {props.dummy && (
                <div style={{ width: 20, fontSize: 5, marginRight: 10 }}>
                  <i className="fas fa-user-md fa-6x" />
                </div>
              )}
              <div style={{ fontSize: 16, fontWeight: "bold" }}>
                {items.prefix} {items.firstName} {items.middleName}{" "}
                {items.lastName}
              </div>
            </div>
          </button>

          <div className="chat-box">
            <div
              className="chat-list"
              ref={chatRef}
              style={{ flex: 1, overflowY: "auto" }}
            >
              {chats.map((msg, idx) => {
                const isSender = msg.From_id === userId;
                return (
                  <div
                    key={idx}
                    className={`message-item ${
                      isSender ? "sender-message" : "receiver-message"
                    }`}
                  >
                    <p
                      className="message-text"
                      style={{ color: isSender ? "#fff" : "#000" }}
                    >
                      {msg.Message}
                      <span
                        className="message-time"
                        style={{ color: isSender ? "#fff" : "#000" }}
                      >
                        {dayjs(msg.Time).format("h:mm A")}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="chat-footer">
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatButton;
