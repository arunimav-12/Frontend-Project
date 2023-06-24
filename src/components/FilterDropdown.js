import React, { useState } from 'react';

const FilterDropdown = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div>
      <h2>Filter Dropdown</h2>
      <div>
        <label htmlFor="filter">Filter By Card Type:</label>
        <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
    </div>
  );
};

export default FilterDropdown;
