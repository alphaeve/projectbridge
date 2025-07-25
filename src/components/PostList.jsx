import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function PostList() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(newPosts);
    });
    return () => unsub();
  }, []);

  const toggleReaction = async (postId, field, hasReacted) => {
    if (!user || !user.username) return;
  
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      [field]: hasReacted
        ? arrayRemove(user.username)
        : arrayUnion(user.username),
    });
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts yet.</p>
      ) : (
        posts.map((post) => {
          const hasLiked = post.likes?.includes(user?.username);
          const hasInterested = post.interested?.includes(user?.username);

          return (
            <div
              key={post.id}
              className="bg-white border border-gray-200 p-6 mb-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-blue-700">{post.name}</h3>
                <small className="text-gray-400 text-sm">
                  {post.timestamp?.toDate().toLocaleString()}
                </small>
              </div>

              <p className="mt-2 text-gray-700">{post.content}</p>

              <div className="flex items-center gap-4 mt-4 text-sm">
                {/* ❤️ Like */}
                <button
                  onClick={() => toggleReaction(post.id, "likes", hasLiked)}
                  className={`px-4 py-1.5 rounded-full border transition text-sm font-medium ${
                    hasLiked
                      ? "bg-red-100 text-red-600 border-red-300"
                      : "text-gray-600 border-gray-300 hover:bg-red-50"
                  }`}
                >
                  ❤️ {post.likes?.length || 0} Like
                </button>

                {/* ⭐ Interested */}
                <button
                  onClick={() =>
                    toggleReaction(post.id, "interested", hasInterested)
                  }
                  className={`px-4 py-1.5 rounded-full border transition text-sm font-medium ${
                    hasInterested
                      ? "bg-yellow-100 text-yellow-600 border-yellow-300"
                      : "text-gray-600 border-gray-300 hover:bg-yellow-50"
                  }`}
                >
                  ⭐ {post.interested?.length || 0} Interested
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PostList;
