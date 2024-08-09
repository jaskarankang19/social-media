import { useContext } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListContext);
  const handleGetPostClick = () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
      });
  };
  return (
    <>
      {postList.length === 0 && (
        <WelcomeMessage onGetPostClick={handleGetPostClick}></WelcomeMessage>
      )}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
