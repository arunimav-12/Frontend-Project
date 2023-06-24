import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CardListing from './components/CardListing';

function App() {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/your-cards">Your Cards</NavLink>
          </li>
          <li>
            <NavLink to="/all-cards">All Cards</NavLink>
          </li>
          <li>
            <NavLink to="/blocked-cards">Blocked Cards</NavLink>
          </li>
        </ul>
      </nav>
      {/* <FilterDropdown onFilterChange={handleFilterChange} /> */}
      <CardListing filter={filter} />
      {/* Add routes for other tabs (Your Cards, All Cards, Blocked Cards) */}
    </div>
  );
}

export default App;