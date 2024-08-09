import { useReducer } from "react";
import { createContext } from "react";

//this a global context
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  addInitialPosts: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.id
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

//a component that can render all the children and use the context
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    const addAction = {
      type: "ADD_POST",
      payload: {
        id: Date.Now,
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    };
    dispatchPostList(addAction);
  };
  const addInitialPosts = (posts) => {
    const addInitialAction = {
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts: posts,
      },
    };
    dispatchPostList(addInitialAction);
  };

  const deletePost = (id) => {
    const deleteAction = {
      type: "DELETE_POST",
      payload: { id },
    };
    dispatchPostList(deleteAction);
  };
  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, addInitialPosts }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
