import { Form, redirect } from "react-router-dom";

const CreatePost = () => {
  //const { addPost } = useContext(PostListContext);

  return (
    <>
      <Form method="POST" className="create-post">
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Enter User Id
          </label>
          <input
            type="text"
            name="userId"
            className="form-control"
            id="id"
            placeholder="Your user id"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="How are you feeling today?"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            type="text"
            name="body"
            className="form-control"
            id="body"
            placeholder="Tell us more about it"
            rows={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            Number of Reactions
          </label>
          <input
            type="number"
            name="reactions"
            className="form-control"
            id="reactions"
            placeholder="How many people reacted to this post?"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Eeter Tags Here
          </label>
          <input
            type="text"
            name="tags"
            className="form-control"
            id="tags"
            placeholder="Please enter tags using space here?"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </Form>
    </>
  );
};

export async function createPostAction(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);

  postData.tags = postData.tags.split(" ");
  fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((post) => {
      console.log(post);
    });
  return redirect("/");
}

export default CreatePost;
