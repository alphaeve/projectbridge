import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const PostSection = () => {
  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">📢 Community Post Board</h2>
      <PostForm />
      <PostList />
    </div>
  );
};

export default PostSection;
