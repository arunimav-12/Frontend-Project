import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardListing = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.example.com/cards?page=${page}&per_page=10&q=${searchQuery}`);
      const { data } = response.data;
      setCards((prevCards) => [...prevCards, ...data]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.length > 0);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollHeight - scrollTop === clientHeight && !isLoading && hasMore) {
      loadCards();
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCards([]);
    setPage(1);
    setHasMore(true);
    loadCards();
  };

  return (
    <div onScroll={handleScroll} style={{ height: '500px', overflow: 'auto' }}>
      <h2>Card Listing</h2>
      <div>
        <input type="text" placeholder="Search by card name" value={searchQuery} onChange={handleSearch} />
      </div>
      <div>
        {cards.map((card) => (
          <div key={card.name} className="card">
            {/* Remaining card content */}
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default CardListing;
