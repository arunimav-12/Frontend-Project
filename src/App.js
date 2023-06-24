import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import CardListing from './components/CardListing';
import FilterDropdown from './components/FilterDropdown';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('your');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/your-cards"
              activeClassName="active"
              onClick={() => handleTabChange('your')}
            >
              Your Cards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-cards"
              activeClassName="active"
              onClick={() => handleTabChange('all')}
            >
              All Cards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blocked-cards"
              activeClassName="active"
              onClick={() => handleTabChange('blocked')}
            >
              Blocked Cards
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
  <Route path="/your-cards" element={<CardListing tab={selectedTab} />} />
  <Route path="/all-cards" element={<CardListing tab={selectedTab} />} />
  <Route path="/blocked-cards" element={<CardListing tab={selectedTab} />} />
</Routes>


      <FilterDropdown />
    </div>
  );
};

export default App;
