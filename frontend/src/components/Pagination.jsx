function Pagination({currentPage, setCurrentPage, totalHotels}){

    const limit = 6;
    return(
        <div className="pagination">

            <button disabled ={currentPage ===1} onClick={() => setCurrentPage(currentPage - 1)}>
                previous
            </button>

            <button disabled ={currentPage * limit >= totalHotels} onClick={() => setCurrentPage(currentPage + 1)}>
                Next
            </button>


        </div>
    )
}

export default Pagination;