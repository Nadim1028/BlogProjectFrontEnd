import { useState } from "react";

import classes from "./ReadMoreReadLess.module.css";

function ReadMoreReadLess(props) {
  const text = props.children;

  const [isReadMoreShown, setReadMoreShown] = useState(false);

  function toggleBtn() {
    setReadMoreShown(!isReadMoreShown);
  }

  return (
    <div>
      {isReadMoreShown ? text : text.substr(0, props.limit)}{" "}
      <button onClick={toggleBtn} className={classes.btn}>
        {isReadMoreShown ? "Read Less" : "...Read More"}
      </button>
    </div>
  );
}

export default ReadMoreReadLess;