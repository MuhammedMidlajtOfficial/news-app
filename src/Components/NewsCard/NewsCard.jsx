import { Clock, ThumbsUp } from 'lucide-react';
import './NewsCard.css';
import { useState } from 'react';
import axios from 'axios';

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

export default NewsCard;