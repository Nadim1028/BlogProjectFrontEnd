import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

import EditStoryForm from "../stories/EditStoryForm";
import AuthContext from "../auth/AuthContext";

function EditStoryPage(props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const child = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const token = authCtx.token;

  function editStoryHandler(storyData) {
    let url = "https://localhost:5001/api/stories/";// + storyId;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(storyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      console.log("Story Updated...");
     //  modalHandler();
      navigate("/");
      window.location.reload(false);
    });
  }

//   function modalHandler() {
//     setIsOpen(!isOpen);
//   }

//   const handleOnClick = () => {
//     if (child.current) {
//       child.current.submitHandler();
//     }
//   };


let content;

  return (
    <section>
        {content}
        <h1>Upadte Story</h1>
        <EditStoryForm onStoryEdit={editStoryHandler} />
    </section>
);
}

export default EditStoryPage;