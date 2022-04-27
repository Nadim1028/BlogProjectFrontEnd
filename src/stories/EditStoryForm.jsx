import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

import classes from "./EditStoryForm.module.css";

const EditStoryForm = forwardRef((props, ref) => {
  const titleInputRef = useRef();
  const bodyInputRef = useRef();
  const dateInputRef = useRef();

 
    function submitHandler() {
      const enteredTitle = titleInputRef.current.value;
      const enteredBody = bodyInputRef.current.value;
      const enteredDate = dateInputRef.current.value;

      const storyId = props.story.storyId;

      const storyData = {
        storyId : storyId,
        storyTitle: enteredTitle,
        storyBody: enteredBody,
        publishedDate: enteredDate,
      };

      console.log(storyData);
      props.onStoryEdit(storyId, storyData);
    }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Story Title</label>
        <input
          type="text"
          required
          id="title"
          ref={titleInputRef}
          defaultValue={props.story.storyTitle}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="body">Story Body</label>
        <textarea
          rows="5"
          required
          id="body"
          ref={bodyInputRef}
          defaultValue={props.story.storyBody}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Published Date</label>
        <input
          type="datetime-local"
          required
          id="date"
          ref={dateInputRef}
          defaultValue={props.story.publishedDate}
        />
      </div>
    </form>
  );
});

export default EditStoryForm;