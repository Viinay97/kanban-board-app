// components/FilterSortPanel.js
import React from 'react';

function FilterSortPanel({ groupingOption, setGroupingOption, sortingOption, setSortingOption }) {
  return (
    <div className="filter-sort-panel">
      <div className="filter-option">
        <label>Grouping </label>
        <select
          value={groupingOption}
          onChange={e => setGroupingOption(e.target.value)}
        >
          <option value="status">Status</option>
          <option value="userId">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="sort-option">
        <label>Ordering </label>
        <select
          value={sortingOption}
          onChange={e => setSortingOption(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSortPanel;
