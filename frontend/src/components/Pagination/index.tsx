import { ReactComponent as NextArrowIcon } from "assets/img/next-arrow.svg";
import { ReactComponent as PreviousArrowIcon } from "assets/img/previous-arrow.svg";
import ReactPaginate from "react-paginate";
import "./styles.css";

type Props = {
  forcePage?: number;
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
};

const Pagination = ({ forcePage, pageCount, range, onChange }: Props) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item base-link"
      breakClassName="pagination-item base-link"
      previousClassName="arrow-previous"
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active base-link"
      disabledClassName="arrow-inactive"
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
      previousLabel={
        <div className="pagination-arrow-container">
          <PreviousArrowIcon />
        </div>
      }
      nextLabel={
        <div className="pagination-arrow-container">
          <NextArrowIcon />
        </div>
      }
    />
  );
};

export default Pagination;
