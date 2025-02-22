// NewsCard.jsx
import React, { useEffect, } from 'react';
import './NewsCard.css';
import NewsCard from './NewsCard';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, setNews } from '../../Redux/slice';
import axios from 'axios';
import io from 'socket.io-client'

const NewsGrid = () => {
  const dispatch = useDispatch();
  const socket = io('http://localhost:7004');

  socket.on('newsUpdate', (newNews) => {
    dispatch(setNews([...news,newNews]));
  });

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading());
      try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/news`)
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
        {/* {console.log('hellooooo-----',news)} */}
        
        {news?.map(news => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;