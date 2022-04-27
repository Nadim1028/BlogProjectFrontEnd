
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


  console.log("TokenId = "+parseInt(authCtx.userId));
  console.log("storyAuthorId = "+props.authorId)
 // console.log("TokenId = "+authCtx.userId+"  localId = "+props.authorId);
  if (parseInt(authCtx.userId) === props.authorId) {
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
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
        {/* <div>{props.id}</div> */}
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