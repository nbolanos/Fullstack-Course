const Filter = ({ searchName, handleFilter }) => {
    return(
        <div>
            Filter shown with: <input type="text" value={searchName} onChange={handleFilter} />
        </div>
    )
};

export default Filter;