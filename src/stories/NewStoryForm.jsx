import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewStoryForm.module.css";

function NewStoryForm(props) {
  const titleInputRef = useRef();
  const bodyInputRef = useRef();
  const dateInputRef = useRef();

  function publishHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredBody = bodyInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    const storyData = {
      storyTitle: enteredTitle,
      storyBody: enteredBody,
      publishedDate: enteredDate,
    };

    props.onAddStory(storyData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={publishHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Story Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="body">Story Body</label>
          <textarea rows="5" required id="body" ref={bodyInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Published Date</label>
          <input type="datetime-local" required id="date" ref={dateInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Publish</button>
        </div>
      </form>
    </Card>
  );
}

export default NewStoryForm;