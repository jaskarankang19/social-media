import { useState, useEffect, useReducer } from "react";
import { createContext } from "react";

//this a global context
export const PostListContext = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.id
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload.post, ...currentPostList];
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

//a component that can render all the children and use the context
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    const addAction = {
      type: "ADD_POST",
      payload: {
        post,
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

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostListContext.Provider
      value={{ postList, fetching, addPost, deletePost }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
