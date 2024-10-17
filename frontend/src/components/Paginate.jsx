import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const createPaginationItems = () => {
    let items = [];

    // Add the "First" button
    items.push(
      <Pagination.First
        as={Link}
        key="first"
        to={!isAdmin ? (keyword ? `/search/${keyword}/page/1` : `/page/1`) : `/admin/productlist/1`}
        disabled={page === 1}
      />
    );

    // Show the first page
    if (page > 3) {
      items.push(
        <Pagination.Item
          as={Link}
          key={1}
          to={!isAdmin ? (keyword ? `/search/${keyword}/page/1` : `/page/1`) : `/admin/productlist/1`}
          active={page === 1}
        >
          1
        </Pagination.Item>
      );
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    // Show pages around the current page
    for (let x = Math.max(1, page - 2); x <= Math.min(pages, page + 2); x++) {
      items.push(
        <Pagination.Item
          as={Link}
          key={x}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x}`
                : `/page/${x}`
              : `/admin/productlist/${x}`
          }
          active={x === page}
        >
          {x}
        </Pagination.Item>
      );
    }

    // Show the last page if current page is far from the last
    if (page < pages - 2) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      items.push(
        <Pagination.Item
          as={Link}
          key={pages}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${pages}`
                : `/page/${pages}`
              : `/admin/productlist/${pages}`
          }
          active={page === pages}
        >
          {pages}
        </Pagination.Item>
      );
    }

    // Add the "Last" button
    items.push(
      <Pagination.Last
        as={Link}
        key="last"
        to={!isAdmin ? (keyword ? `/search/${keyword}/page/${pages}` : `/page/${pages}`) : `/admin/productlist/${pages}`}
        disabled={page === pages}
      />
    );

    return items;
  };

  return pages > 1 && <Pagination>{createPaginationItems()}</Pagination>;
};

export default Paginate;
