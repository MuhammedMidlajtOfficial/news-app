// TopicsFilter.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './TopicsFilter.css';

const TopicsFilter = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  

  const topics = [
    'All',
    'Trending News',
  ];

  // Handle scroll buttons visibility
  const handleScroll = (e) => {
    const container = e.target;
    setShowLeftScroll(container.scrollLeft > 0);
    setShowRightScroll(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  // Scroll handlers
  const scrollLeft = () => {
    const container = document.querySelector('.topics-row');
    container.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.querySelector('.topics-row');
    container.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        <div className="scroll-container">
          {showLeftScroll && (
            <button 
              className="scroll-button scroll-left"
              onClick={scrollLeft}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          <div className="topics-row" onScroll={handleScroll}>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveFilter(topic)}
                className={`topic-button ${activeFilter === topic ? 'active' : ''}`}
              >
                {topic}
              </button>
            ))}
          </div>

          {showRightScroll && (
            <button 
              className="scroll-button scroll-right"
              onClick={scrollRight}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicsFilter;