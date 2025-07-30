import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { id } = useParams(); // e.g., project or room ID
  const [messages, setMessages] = useState([
    // Temporary dummy messages for layout
    { text: "Hello, I saw your project post!", sender: "Developer", time: "10:30 AM" },
    { text: "Yes! I need it in React.", sender: "client", time: "10:31 AM" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      text: input,
      sender: "you", // In future, use user role (client/Developer)
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Chat Room - Project ID: {id}</h2>

      <div className="h-[400px] overflow-y-auto bg-gray-100 p-4 rounded">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col mb-2 ${
              msg.sender === "you" || msg.sender === "client"
                ? "items-end"
                : "items-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs ${
                msg.sender === "you" || msg.sender === "client"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {msg.sender} • {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border px-3 py-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
