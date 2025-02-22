import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setNews, setLoading, setError } from '../../Redux/slice';
import './TopicsFilter.css';
import axios from 'axios';

const TopicsFilter = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const topics = ['All', 'Trending News'];

  const handleScroll = (e) => {
    const container = e.target;
    setShowLeftScroll(container.scrollLeft > 0);
    setShowRightScroll(container.scrollLeft < container.scrollWidth - container.clientWidth);
  };

  const scrollLeft = () => {
    document.querySelector('.topics-row').scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.querySelector('.topics-row').scrollBy({ left: 200, behavior: 'smooth' });
  };

  const fetchNews = async (filter) => {
    dispatch(setLoading());
    try {
      const url = filter === 'All' 
      ? `${process.env.REACT_APP_BASE_URL}/api/news` 
      : `${process.env.REACT_APP_BASE_URL}/api/news/trending`;
      await axios.get(url)
      .then((response)=>{
        console.log(response.data.news);
        dispatch(setNews(response.data.news));
      }).catch((err)=>{
        console.log(err);
      })
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };

  const handleFilterChange = (topic) => {
    setActiveFilter(topic);
    fetchNews(topic);
  };

  useEffect(() => {
    fetchNews(activeFilter);
  }, [activeFilter]);

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        <div className="scroll-container">
          {showLeftScroll && (
            <button className="scroll-button scroll-left" onClick={scrollLeft}>
              <ChevronLeft size={20} />
            </button>
          )}
          
          <div className="topics-row" onScroll={handleScroll}>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleFilterChange(topic)}
                className={`topic-button ${activeFilter === topic ? 'active' : ''}`}
              >
                {topic}
              </button>
            ))}
          </div>

          {showRightScroll && (
            <button className="scroll-button scroll-right" onClick={scrollRight}>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicsFilter;