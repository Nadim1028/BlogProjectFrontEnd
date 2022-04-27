import StoryItem from "./StoryItem";


function StoryList(props) {

  

  return (
    <ul>
      {props.stories.map((story) => (
        <StoryItem
          key={story.storyId}
          id={story.storyId}
          title={story.storyTitle}
          body={story.storyBody}
          publishedDate={story.publishedDate}
          authorId={story.authorId}
        />
      ))}
    </ul>
  );
}

export default StoryList;