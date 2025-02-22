import { Clock, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import './NewsCard.css';

const NewsCard = ({
  title = "Hello",
  description = "World....",
  image = "",
  category = "New categ",
  date = "2025-02-22T13:37:37.514Z",
  likes = 0,
  isBookmarked = false,
  views = 0,
}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
        <p className="news-description">{description}</p>
        
        <div className="news-metadata">
          <div className="publish-info">
            <Clock size={16} />
            <span>{formatDate(date)}</span>
            {/* <span>•</span> */}
            {/* <span>{views} views</span> */}
          </div>
        </div>

        <div className="news-actions">
          <div className="left-actions">
            <button className="action-button">
              <ThumbsUp size={18} />
              <span>{likes}</span>
            </button>
            {/* <button className="action-button">
              <Share2 size={18} />
              <span>Share</span>
            </button> */}
          </div>
          
          {/* <button className={`action-button ${isBookmarked ? 'bookmarked' : ''}`}>
            <Bookmark size={18} />
          </button> */}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;