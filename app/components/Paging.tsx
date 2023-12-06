
function Paging({ setPage, numOfPages = 10 }) {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div className="flex">
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        hideNextButton
        hidePrevButton
        color="primary"
      />
    </div>
  )
}

export default Paging;