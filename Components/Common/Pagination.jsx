import ReactPaginate from "react-paginate";

const Pagination = ({ page, page_count, setPage }) => {
  return (
    <nav className="tu-pagination">
      <ReactPaginate
        activeClassName="active"
        activeLinkClassName="active"
        initialPage={page - 1}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="tu-pagination-prev"
        nextClassName="tu-pagination-next"
        breakLabel="..."
        onPageChange={(e) => setPage(e.selected + 1)}
        pageCount={page_count}
        previousLabel={
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M9.98328 11.9665L6.01661 7.99987L9.98328 4.0332"
                stroke="#B9B9B9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        }
        nextLabel={
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M6.16675 11.9665L10.1334 7.99987L6.16675 4.0332"
                stroke="#B9B9B9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        }
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
      />
    </nav>
  );
};

export default Pagination;
