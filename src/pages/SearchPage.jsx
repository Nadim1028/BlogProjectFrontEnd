
import { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import StoryList from "../stories/StoryList";
import Pagination from "../layouts/Pagination";



function SearchPage() {
    const searchInputRef = useRef();
  
    const [isLoading, setIsLoading] = useState(true);
    const [loadedStories, setLoadedStories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchString, setSearchString] = useState("");
  
    const postsPerPage = 3;
  
    let content;
  
    useEffect(() => {
      setIsLoading(true);
      let url = `https://localhost:5001/api/stories/search?pageSize=${postsPerPage}&pageNumber=${currentPage}&searchString=${searchString}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          const stories = [];
          result.data.forEach((story) => {
            stories.push(story);
          });
          setIsLoading(false);
          setLoadedStories(stories);
          setTotalPages(result.totalPage);
          setCurrentPage(result.currentPage);
          console.log("I got called");
        });
    }, [currentPage, searchString]);
  
    function onSearch() {
      const string = searchInputRef.current.value;
      setSearchString(string);
    }
  
    function onEnter(e) {
      if (e.key === "Enter") onSearch();
    }
  
    function onPageChange(selected) {
      const page = selected.selected + 1;
      console.log("clicked", page);
      setCurrentPage(page);
    }
  
    if (isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    }
  
    if (loadedStories.length !== 0) {
      content = (
        <Pagination
          currentPage={currentPage - 1}
          totalPages={totalPages}
          pageChanged={onPageChange}
        />
      );
    }
    return (
      <section>
        <Row className="mb-4">
          <Col md={10} xs={8}>
            <Form.Control
              defaultValue={searchString}
              type="text"
              placeholder="Search ..."
              ref={searchInputRef}
              onKeyPress={onEnter}
            />
          </Col>
          <Col md={2} xs={4}>
            <Button
              variant="success"
              style={{ width: "100%" }}
              onClick={onSearch}
            >
              Search
            </Button>
          </Col>
        </Row>
        <StoryList stories={loadedStories} />
        {content}
      </section>
    );
  }
  
  export default SearchPage;