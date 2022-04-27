import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import NewStoryForm from "../stories/NewStoryForm";
import AuthContext from "../auth/AuthContext";

function NewStoryPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  function addStoryHandler(storyData) {
    fetch("https://localhost:5001/api/stories", {
      method: "POST",
      body: JSON.stringify(storyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      console.log("Story Added...");
      navigate("/");
    });
  }

  let content;

  if (authCtx.token === "") {
    content = <p>User is not logged in...</p>;
  } else {
    content = <p>User is already logged in...</p>;
  }

  return (
    <section>
      {content}
      <h1>Create Story</h1>
      <NewStoryForm onAddStory={addStoryHandler} />
    </section>
  );
}

export default NewStoryPage;