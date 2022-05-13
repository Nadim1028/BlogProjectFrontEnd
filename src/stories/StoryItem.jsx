import { useState, useContext,useEffect } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import EditStoryModal from "../modal/EditStoryModal";
import AuthContext from "../auth/AuthContext";
import DeleteStory from "./DeleteStory";
import ReadMoreReadLess from "./ReadMoreReadLess";

function StoryItem(props) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [author,setAuthor]=useState();
  const [isLoading, setIsLoading] = useState(true);

  function downloadXml() {
    console.log("PropId = ",props.id);
    fetch(`https://localhost:5001/api/stories/${props.id}`, {
      method: "GET",
      headers: {
        Accept: "application/xml",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.blob())

      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${props.title}.xml`);

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }

  function downloadJson() {
    fetch(`https://localhost:5001/api/stories/${props.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${props.title}.json`);

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }

  useEffect(() => {
    setIsLoading(true);

    fetch("https://localhost:5001/api/authors/"+props.authorId)
      .then((response) => {          
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAuthor(data)
        setIsLoading(false);
      
      });


  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  let content;
 
  if (parseInt(authCtx.userId)=== props.authorId) {
    content = (
      <div className="d-flex">
        <div className="pe-1 mt-1">
          <Button variant="outline-secondary" onClick={downloadXml} size="sm">
            xml
          </Button>
        </div>
        <div className="pe-1 mt-1">
          <Button variant="outline-secondary" onClick={downloadJson} size="sm">
            json
          </Button>
        </div>
        <div style={{ width: "100%" }}></div>
        <div className="pe-1">
          <EditStoryModal story={props} />
        </div>
        <div className="pe-1">
          <DeleteStory storyId={props.id} />
        </div>
      </div>
    );
  }

  return (
    <Col>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h4>{props.title}</h4>
          </Card.Title>
          <Card.Subtitle className="muted offset-1">
            - Written by {author.userName}  on {props.publishedDate.substring(0, 10)} 
          </Card.Subtitle>
          <hr />
          <ReadMoreReadLess limit={100}>{props.body}</ReadMoreReadLess>
          <hr />
          {content}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default StoryItem;

/*
import { useState,useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import jwt from "jwt-decode";
import AuthContext from "../auth/AuthContext";
import Card from "../ui/Card";
import EditStoryPage from "../pages/EditStoryPage";
import DeleteStory from "./DeleteStory";
import EditStoryModal from "../modal/EditStoryModal";

function StoryItem(props) {


  const authCtx = useContext(AuthContext);
  const [author,setAuthor]=useState();
  let content;


  //console.log("TokenId = "+parseInt(authCtx.userId));
 //console.log("storyAuthorId = "+props.authorId)
 // console.log("TokenId = "+authCtx.userId+"  localId = "+props.authorId);
 
  if (parseInt(authCtx.userId) === props.authorId) {
    content = (
      <div>
        <EditStoryModal story={props} />
        <DeleteStory storyId={props.id} />
      </div>
    );
  }


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://localhost:5001/api/authors/"+props.authorId)
      .then((response) => {          
        return response.json();
      })
      .then((data) => {
       // console.log(data);
        setAuthor(data)
        setIsLoading(false);
      
      });


  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }


  return (
    <li>
      <br/>
      <Card>
        {/* <div>{props.id}</div> *///}


    /*  
        <div><h3 >{props.title}</h3></div>
        <div>{props.body}</div>
        <div><b><i>Author : {author.userName}</i></b></div>
        <div>Published On : {props.publishedDate}</div>
        {content}
      </Card>

    
    </li>
    
  );
}

export default StoryItem;
*/