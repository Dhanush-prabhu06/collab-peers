import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatArea = ({ socket, activeChannel }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      console.warn("No username found. Redirecting to login.");
      navigate("/login");
    }

    const fetchMessages = async () => {
      try {
        let response;
        if (activeChannel.includes("@")) {
          response = await axios.get(
            `/api/direct-message/${username}/${activeChannel}`
          );
        } else {
          response = await axios.get(`/api/messages/${activeChannel}`);
        }

        setMessages(response.data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("message", (data) => {
      if (data.channel === activeChannel) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [socket, activeChannel, username, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });

      socket.emit("message", {
        username,
        message,
        channel: activeChannel,
        time: formattedTime,
      });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto bg-white rounded-lg shadow-lg h-[85vh] border border-gray-200">
      {/* Channel Details */}
      <div className="bg-indigo-500 text-white text-lg font-bold p-4 rounded-t-lg text-center">
        {activeChannel}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              msg.username === username
                ? "bg-indigo-100 text-indigo-900 self-end"
                : "bg-gray-200 text-gray-900 self-start"
            } max-w-xs break-words`}
          >
            <div className="font-semibold">
              {msg.username}
            </div>
            <div>{msg.message}</div>
            <div className="text-xs text-gray-400 text-right">
              {msg.time}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="flex items-center p-4 border-t border-gray-200 bg-white">
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          placeholder="Type a message..."
          autoComplete="off"
          className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <svg
          className="ml-4 w-6 h-6 text-indigo-500 cursor-pointer hover:text-indigo-700 transition duration-200"
          viewBox="0 0 25 25"
          onClick={sendMessage}
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.248,6.973c0-0.614,0.741-0.921,1.174-0.488l5.131,5.136 c0.269,0.269,0.269,0.704,0,0.973l-5.131,5.136c-0.433,0.433-1.174,0.126-1.174-0.488v-2.319c-4.326,0-7.495,1.235-9.85,3.914 c-0.209,0.237-0.596,0.036-0.511-0.268c1.215-4.391,4.181-8.492,10.361-9.376V6.973z"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChatArea;
