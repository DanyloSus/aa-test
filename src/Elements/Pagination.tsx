import { Dispatch } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<React.SetStateAction<number>>;
};

const Pagination = (props: PaginationProps) => {
  const renderPagination = () => {
    const pagesToShow = [];
    const maxPages = 5;

    if (props.totalPages <= maxPages) {
      for (let i = 1; i <= props.totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      const startPage = Math.max(1, props.currentPage - 2);
      const endPage = Math.min(props.totalPages, startPage + maxPages - 1);

      if (startPage > 1) {
        pagesToShow.push(1, "...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
      }

      if (endPage < props.totalPages) {
        pagesToShow.push("...", props.totalPages);
      }
    }

    return pagesToShow.map((page, index) => (
      <span
        role="button"
        key={index}
        onClick={() => handlePageClick(page)}
        className={props.currentPage === page ? "active" : ""}
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
