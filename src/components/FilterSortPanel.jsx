import React, { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FilterSortPanel({ groupingOption, setGroupingOption, sortingOption, setSortingOption }) {
  const [isDisplayed, setIsDisplayed] = useState(false);

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
              onChange={e => setGroupingOption(e.target.value)}
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
              onChange={e => setSortingOption(e.target.value)}
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
