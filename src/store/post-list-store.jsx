import { useReducer } from "react";
import { createContext } from "react";

//this a global context
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.id
    );
  }
  return newPostList;
};

//a component that can render all the children and use the context
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POSTLIST
  );
  const addPost = () => {};

  const deletePost = (id) => {
    const deleteAction = {
      type: "DELETE_POST",
      payload: { id },
    };
    dispatchPostList(deleteAction);
  };
  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

const DEFAULT_POSTLIST = [
  {
    id: "1",
    title: "Going to Toronto",
    body: "Today I am going to Toronto to watch Leafs game. ",
    reactions: 2,
    userId: "user-1",
    tags: ["goleafsgo", "hockey"],
  },
  {
    id: "2",
    title: "Going to Wonderland",
    body: "Today I am going to Wonderland!! ",
    reactions: 6,
    userId: "user-2",
    tags: ["striker", "slides"],
  },
];

export default PostListProvider;
