import React, { useState, useEffect } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FilterSortPanel({ groupingOption, setGroupingOption, sortingOption, setSortingOption }) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleGroupingChange = (e) => {
    const selectedOption = e.target.value;
    setGroupingOption(selectedOption);
    localStorage.setItem('groupingOption', selectedOption);
  };
  const handleSortingChange = (e) => {
    const selectedOption = e.target.value;
    setSortingOption(selectedOption);
    localStorage.setItem('sortingOption', selectedOption);
  };
  useEffect(() => {
    const savedGroupingOption = localStorage.getItem('groupingOption');
    const savedSortingOption = localStorage.getItem('sortingOption');

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }

    if (savedSortingOption) {
      setSortingOption(savedSortingOption);
    }
  }, []);


  return (
    <div className="filter-sort-panel">
      <button 
      className='display select'
      onClick={() => setIsDisplayed(!isDisplayed)}>
        <TuneIcon className='icons'/>
        Display
        <ExpandMoreIcon className='icons'/>
      </button>

      {isDisplayed && (
        <div className='dropdowns'>
          <div className="filter-option button">
            <span>Grouping </span>
            <select
              className='select'
              value={groupingOption}
              onChange={handleGroupingChange}
            >
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="sort-option button">
            <span>Ordering </span>
            <select
              className='select'
              value={sortingOption}
              onChange={handleSortingChange}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSortPanel;
