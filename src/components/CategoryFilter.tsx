import styled from 'styled-components';
import Button from './Button';

interface CategoryFilterProps {
    selectedCategory: string;
    allCategories: string[];
    onCategoryChange: (selectedCategory: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, allCategories, onCategoryChange }) => {

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCategoryChange(e.target.value);
      }

    return (
        <FilterForm>
      <CategorySelect
        name="selectCategory"
        id="selectCategory"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="" disabled hidden>
          Filter a Category
        </option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </CategorySelect>

      <Button
  type="button"
  variant="secondary"
  disabled={selectedCategory === ''}
  onClick={() => onCategoryChange('')}
>
  Reset Filter
</Button>

    </FilterForm>
    )
}

const FilterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 2rem auto;
`;

const CategorySelect = styled.select`
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid var(--text-light-gray);
  background-color: var(--text-white);
  color: var(--text-gray);
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`;


export default CategoryFilter;