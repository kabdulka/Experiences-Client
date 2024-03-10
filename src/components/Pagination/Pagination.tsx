import { Pagination, PaginationItem } from "@mui/material"
// import { Pagination, PaginationItem } from "@mui/material"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { getPosts } from "../../api";

interface PageProps {
  page: number
}

const Paginate: React.FC<PageProps> = ({ page }) => {

  const numOfPages = useAppSelector((state) => state.postsReducer.data.numberOfPages);
  console.log(numOfPages)
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if page exists
    if (page) {
      console.log("inside pagination", page)
      dispatch(getPosts(page));
    }
  }, [page])

  return (
    <Pagination
    sx={{
      ul: {
        justifyContent: "space-around",
        // Add other styles as needed
      },
    }}
      count={numOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />}
    
    />
  )
}

export default Paginate;
