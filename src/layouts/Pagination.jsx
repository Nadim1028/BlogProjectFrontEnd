import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import classes from "./Pagination.module.css";

function Pagination(props) {
  return (
    <div className="mt-4">
      <ReactPaginate
        breakLabel={"..."}
        nextLabel={"Next"}
        forcePage={props.currentPage}
        onPageChange={props.pageChanged}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={props.totalPages}
        previousLabel={"Previous"}
        containerClassName={classes.paginationBttns}
        previousClassName={classes.previousBttn}
        nextClassName={classes.nextBttn}
        disabledLinkClassName={classes.paginationDisabled}
        activeClassName={classes.paginationActive}
      />
    </div>
  );
}

export default Pagination;