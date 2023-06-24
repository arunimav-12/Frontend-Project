import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardListing = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.example.com/cards?page=${page}&per_page=10`);
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

  return (
    <div onScroll={handleScroll} style={{ height: '500px', overflow: 'auto' }}>
      <h2>Card Listing</h2>
      <div>
        {cards.map((card) => (
          <div key={card.name} className="card">
            <div className="card-type">{card.card_type}</div>
            <div className="card-details">
              <div className="card-name">{card.name}</div>
              <div className="card-info">
                {card.card_type === 'burner' ? (
                  <div>
                    <div className="card-expiry-label">Expiry:</div>
                    <div className="card-expiry">{card.expiry}</div>
                  </div>
                ) : (
                  <div>
                    <div className="card-limit-label">Limit:</div>
                    <div className="card-limit">{card.limit}</div>
                  </div>
                )}
                <div className="card-status">{card.status}</div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default CardListing;
