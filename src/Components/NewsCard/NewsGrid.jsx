// NewsCard.jsx
import React, { useEffect, } from 'react';
import './NewsCard.css';
import NewsCard from './NewsCard';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, setNews } from '../../Redux/slice';
import axios from 'axios';

const NewsGrid = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading());
      try {
        await axios.get("http://localhost:7004/api/news")
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
    fetchNews()
  }, []);

  const { news, status, error} = useSelector((state)=> state)

  return (
    <div className="news-grid">
      <div className="news-grid-container">
        {news.map(news => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;