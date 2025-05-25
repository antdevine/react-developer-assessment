import styled from 'styled-components';
import Button from './Button';

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
        <PaginationWrapper>
      <Button onClick={handlePrevPage} disabled={page <= 1} variant="primary">
        Previous
      </Button>


      <PageInfo>Page {page} of {totalPages}</PageInfo>

      <Label htmlFor="amountPerPage">Amount per page</Label>
      <PerPageSelect
        name="amountPerPage"
        id="amountPerPage"
        value={perPage}
        onChange={handleAmountPerPage}
      >
        <option value="10">10</option>
        <option value="20">20</option>
      </PerPageSelect>

      <Button onClick={handleNextPage} disabled={page === totalPages} variant="primary">
        Next
      </Button>

    </PaginationWrapper>
    )
}

const PaginationWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem auto;
  padding: 1rem;
  border-top: 1px solid var(--secondary-color-disabled);
`;

const PageInfo = styled.span`
  font-size: 0.95rem;
  color: var(--text-gray);
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: var(--text-gray);
`;

const PerPageSelect = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--text-light-gray);
  font-size: 0.875rem;
  background-color: var(--text-white);
  color: var(--text-gray);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`;


export default Pagination;