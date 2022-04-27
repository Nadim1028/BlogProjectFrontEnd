import { useEffect, useState } from "react";

import StoryList from "../stories/StoryList";

function AllStoriesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedStories, setLoadedStories] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://localhost:5001/api/stories")
      .then((response) => {
       // console.log(response);
        return response.json();
      })
      .then((data) => {
       // console.log(data);
        const stories = [];
        
        //data = JSON.parse(data);

        data.forEach((story) => {
          stories.push(story);
        });

        setIsLoading(false);
        setLoadedStories(stories);

        //console.log(stories);
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
    <section>
      <h1>BlogStories</h1>
      <StoryList stories={loadedStories} />
    </section>
  );
}

export default AllStoriesPage;