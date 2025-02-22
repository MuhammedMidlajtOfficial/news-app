import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setNews, setLoading, setError } from '../../Redux/slice';
import './TopicsFilter.css';
import axios from 'axios';

const TopicsFilter = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [topics, setTopics] = useState([
    { name: 'All', id: 1 },
    { name: 'Trending News', id: 2 }
  ]);
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:7004/api/categories');
        
        // Extract categories and keep the structure consistent
        const categories = response.data.map((categ) => ({
          name: categ.categoryName,
          id: categ._id // Keeping the ID reference
        }));
  
        setTopics([
          { name: 'All', id: null },
          { name: 'Trending News', id: null },
          ...categories
        ]); // Update state with structured categories
  
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

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
      const url =
        filter === 'All'
          ? `${process.env.REACT_APP_BASE_URL}/api/news`
          : filter === 'Trending News'
          ? `${process.env.REACT_APP_BASE_URL}/api/news/trending`
          : `${process.env.REACT_APP_BASE_URL}/api/news?category=${activeFilterId}`;

          
          const response = await axios.get(url);
          console.log(response);
      dispatch(setNews(response.data.news));
    } catch (err) {
      console.error(err);
      dispatch(setError(err.message));
    }
  };

  const handleFilterChange = (topic, id = null) => {
    setActiveFilter(topic);
    setActiveFilterId(id)
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
                key={topic.name === 'All' ? 1 : topic.name === 'Trending News' ? 2 : topic.id}
                onClick={() => handleFilterChange(topic.name, topic.id)}
                className={`topic-button ${activeFilter === topic.name ? 'active' : ''}`}
              >
                {topic.name}
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