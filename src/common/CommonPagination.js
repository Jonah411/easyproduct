import React from "react";
import { Pagination as MuiPagination, IconButton } from "@mui/material";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const CommonPagination = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  items,
}) => {
  const totalPages = Math.ceil(items.length / rowsPerPage);

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, items.length);
  const currentItemsCount = endIndex - startIndex;

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  return (
    <div className="pagination-container">
      <div className="d-flex align-items-center justify-content-between">
        <div className="me-2">
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="form-select form-select-sm"
          >
            {[5, 10, 25, -1].map((option) => (
              <option key={option} value={option}>
                {option === -1 ? "All" : option}
              </option>
            ))}
          </select>
        </div>

        <div className="me-2">
          <span>
            Showing {currentItemsCount}{" "}
            {currentItemsCount === 1 ? "item" : "items"} of {items.length}
          </span>
        </div>

        <div className="pagination-controls d-flex align-items-center">
          <IconButton
            onClick={() => handleChangePage(null, 1)}
            disabled={page === 0}
            aria-label="first page"
          >
            <FirstPageRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => handleChangePage(null, page)}
            disabled={page === 0}
            aria-label="previous page"
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <MuiPagination
            count={totalPages}
            page={page + 1}
            onChange={handleChangePage}
            siblingCount={1}
            boundaryCount={1}
            color="primary"
            shape="rounded"
          />

          <IconButton
            onClick={() => handleChangePage(null, page + 2)}
            disabled={page >= totalPages - 1}
            aria-label="next page"
          >
            <ChevronRightRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => handleChangePage(null, totalPages)}
            disabled={page >= totalPages - 1}
            aria-label="last page"
          >
            <LastPageRoundedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CommonPagination;
