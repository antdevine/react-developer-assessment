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
        <>
            <form>
            <select 
            name='selectCategory' 
            id='selectCategory'
            value={selectedCategory}
            onChange={handleCategoryChange}
            >
            <option value="" disabled hidden>Filter a Category</option>
            {allCategories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>

            <button type="button" disabled={selectedCategory === ''} onClick={() => onCategoryChange('')}>Reset Category Filter</button>
            </form>
        </>
    )
}

export default CategoryFilter;