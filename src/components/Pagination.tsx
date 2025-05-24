interface PaginationProps {
    totalPages: number;
    page: number;
    perPage: number;
    onPerPageChange: (perPage: number) => void;
    onPageChange: (page: number) => void;
  }

const Pagination: React.FC<PaginationProps> = ({ totalPages, page, perPage, onPerPageChange, onPageChange }) => {

    const handleAmountPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onPerPageChange(Number(e.target.value));
      };
    
      const handlePrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onPageChange(page - 1);
      };
    
      const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onPageChange(page  + 1);
      };

    return (
        <>
        <form className="pagination">
        <button onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <label htmlFor='amountPerPage'>Amount per page</label>
        <select 
        name='amountPerPage' 
        id='amountPerPage'
        value={perPage}
        onChange={handleAmountPerPage}
        >
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </form>
        </>
    )
}

export default Pagination;