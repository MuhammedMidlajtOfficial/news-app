// NewsCard.jsx
import React, { useEffect, } from 'react';
import './NewsCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, setNews } from '../../Redux/slice';
import axios from 'axios';
import io from 'socket.io-client'
import { Clock, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
const NewsGrid = () => {

  const NewsCard = ({ title, content, image, category, like, timestamp, ...newsData }) => {
    const formatDate = (timestamp) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(timestamp).toLocaleDateString('en-US', options);
    };

    const [likeCount, setLikeCount] = useState(like); // Initialize with 'likes' from props

    const updateLike = async () => {
      try {
        console.log('_id-',newsData);
        
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/news/updateLike`, { newsId: newsData?._id })
        .then(()=>{
          setLikeCount((prevLikes) => prevLikes + 1); 
          fetchNews()
          console.log('Like Updated');
        })
      } catch (err) {
        console.error('Error updating like:', err);
      }
    };

    return (
      <article className="news-card">
        {image && (
          <div className="news-card-image">
            <img src={image} alt={title} />
            <span className="category-badge">{category}</span>
          </div>
        )}

        <div className="news-card-content">
          <h2 className="news-title">{title}</h2>
          <p className="news-description">{content}</p>
          
          <div className="news-metadata">
            <div className="publish-info">
              <Clock size={16} />
              <span>{formatDate(timestamp)}</span>
            </div>
          </div>

          <div className="news-actions">
            <div className="left-actions">
              <button className="action-button" onClick={updateLike}>
                <ThumbsUp size={18} />
                <span>{likeCount ? likeCount : 0 }</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  };


  const dispatch = useDispatch();
  const socket = io('http://localhost:7004');

  socket.on('newsUpdate', (newNews) => {
    dispatch(setNews([...news,newNews]));
  });

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

  useEffect(() => {
    fetchNews()
  }, []);

  const { news, status, error} = useSelector((state)=> state)

  return (
    <div className="news-grid">
      <div className="news-grid-container">
        {news?.map(news => (
          <NewsCard key={news?.id} {...news} />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;