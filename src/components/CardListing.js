import React, { useState, useEffect } from "react";
import "./styles.css";
import mockData from "./mockData"; // Import the mock API data

const CardListing = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    loadCards();
  }, [filterType, searchQuery]);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      // Simulate an API request by setting a timeout
      setTimeout(() => {
        let filteredData = mockData.data;

        if (filterType !== "all") {
          filteredData = filteredData.filter(
            (card) => card.card_type === filterType
          );
        }

        if (searchQuery !== "") {
          filteredData = filteredData.filter((card) =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setCards(filteredData);
        setIsLoading(false);
      }, 1000); // Simulate a 1-second delay
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div style={{ height: "500px", overflow: "auto" }}>
      <h2>Card Listing</h2>
      <div>
        <input
          type="text"
          placeholder="Search by card name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div>
        <label htmlFor="filter">Filter By Card Type:</label>
        <select
          id="filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
      <div className="card-container">
        {cards.map((card) => (
          <div key={card.name} className="card">
            <div className="card-name">{card.name}</div>
            <div className="card-type">{card.card_type}</div>
            <div className="card-details">
              <div className="card-info">
                <span className="card-expiry-label">Expiry:</span>
                <span>{card.expiry}</span>
              </div>
              <div className="card-info">
                <span className="card-limit-label">Limit:</span>
                <span>{card.limit}</span>
              </div>
              <div className="card-status">{card.status}</div>
            </div>
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default CardListing;
