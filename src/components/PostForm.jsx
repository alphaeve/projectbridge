import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function PostForm() {
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { user, isSubscribed } = useAuth();

  const handlePost = async () => {
    if (!content.trim() || !user || !isSubscribed) return;

    try {
      await addDoc(collection(db, "posts"), {
        name: user.username || "Guest",
        userId: user.username || "anonymous",
        content,
        timestamp: serverTimestamp(),
        likes: [],
        interested: [],
      });

      setContent("");
      setShowForm(false);
    } catch (error) {
      console.error("Error posting:", error);
      alert("❌ Failed to post. Try again.");
    }
  };

  // Show a message if not subscribed
  if (!isSubscribed) {
    return (
      <div className="max-w-4xl mx-auto my-10 text-center bg-yellow-100 border border-yellow-300 p-4 rounded-md text-yellow-800">
        🚫 You need a subscription to create or share posts.{" "}
        <Link to="/subscribe" className="text-blue-600 font-semibold underline">
          Subscribe Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mb-8">
      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full shadow transition-transform transform hover:scale-105"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Cancel" : "Create Post"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white mt-4 border border-gray-200 rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            What's on your mind?
          </h2>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
            placeholder="Share your thoughts or ask something..."
          />

          <div className="text-right mt-4">
            <button
              onClick={handlePost}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostForm;
