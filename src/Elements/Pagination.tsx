import { Dispatch } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<React.SetStateAction<number>>;
};

const Pagination = (props: PaginationProps) => {
  const renderPagination = () => {
    const pagesToShow = []; // array of pages
    const maxPages = 5; // maximum pages to show variables

    if (props.totalPages <= maxPages) {
      // if count of total pages less than 5 the just show array of pages number
      for (let i = 1; i <= props.totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      const startPage = Math.max(1, props.currentPage - 2); // start page
      const endPage = Math.min(props.totalPages, startPage + maxPages - 1); // end page

      if (startPage > 1) {
        pagesToShow.push(1, "..."); // 1 ...
      }

      for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i); // 1 2 3 or 1 ... 4 5 6
      }

      if (endPage < props.totalPages) {
        pagesToShow.push("...", props.totalPages); // ... 10
      }
    }

    return pagesToShow.map((page, index) => (
      <span
        role={typeof page === "number" ? "button" : ""}
        key={index}
        onClick={() => handlePageClick(page)}
        className={props.currentPage === page ? "opacity-100" : "opacity-50 "}
      >
        {page}
      </span>
    ));
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      props.onPageChange(page);
    }
  };

  return <div className="d-flex gap-2">{renderPagination()}</div>;
};

export default Pagination;
