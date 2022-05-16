import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Col, Container } from "react-bootstrap";

import EditStoryForm from "../stories/EditStoryForm";
import AuthContext from "../auth/AuthContext";

function EditStoryModal(props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const child = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const token = authCtx.token;

  function editStoryHandler(storyId, storyData) {
    let url = "https://localhost:5001/api/stories";///" + storyId;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(storyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      console.log("Story Updated...");
      modalHandler();
      navigate("/");
      window.location.reload(false);
    });
  }

  function modalHandler() {
    setIsOpen(!isOpen);
  }

  const handleOnClick = () => {
    if (child.current) {
      child.current.submitHandler();
    }
  };

  return (
    <div className="d-inline-flex">
      <Button variant="success" onClick={modalHandler}>
        Edit
      </Button>
      <Modal show={isOpen}>
        <Modal.Header>Edit Story</Modal.Header>
        <Modal.Body>
          <EditStoryForm
            onStoryEdit={editStoryHandler}
            ref={child}
            story={props.story}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="danger" onClick={handleOnClick}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditStoryModal;