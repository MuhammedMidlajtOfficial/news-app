// NewsCard.jsx
import React from 'react';
import { Clock, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import './NewsCard.css';

const NewsCard = ({ 
  title, 
  description, 
  image, 
  category, 
  author, 
  date, 
  readTime, 
  likes,
  isBookmarked = false 
}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <article className="news-card">
      <div className="news-card-image">
        <img src={image} alt={title} />
        <span className="category-badge">{category}</span>
      </div>
      
      <div className="news-card-content">
        <h2 className="news-title">{title}</h2>
        <p className="news-description">{description}</p>
        
        <div className="news-metadata">
          <div className="author-info">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="author-avatar" 
            />
            <span className="author-name">{author.name}</span>
          </div>
          
          <div className="publish-info">
            <Clock size={16} />
            <span>{formatDate(date)}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
        </div>

        <div className="news-actions">
          <div className="left-actions">
            <button className="action-button">
              <ThumbsUp size={18} />
              <span>{likes}</span>
            </button>
            <button className="action-button">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
          
          <button className={`action-button ${isBookmarked ? 'bookmarked' : ''}`}>
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

// Example usage component showing a grid of news cards
const NewsGrid = () => {
  const sampleNews = [
    {
      id: 1,
      title: "The Future of AI: Breakthroughs and Challenges",
      description: "Exploring the latest developments in artificial intelligence and their impact on society, business, and everyday life.",
      image: "/api/placeholder/800/400",
      category: "Technology",
      author: {
        name: "Sarah Johnson",
        avatar: "/api/placeholder/40/40"
      },
      date: "2025-02-22",
      readTime: 5,
      likes: 234,
      isBookmarked: false
    },
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement",
      description: "World leaders come together to establish ambitious new targets for reducing carbon emissions and combating climate change.",
      image: "/api/placeholder/800/400",
      category: "Environment",
      author: {
        name: "Michael Chen",
        avatar: "/api/placeholder/40/40"
      },
      date: "2025-02-21",
      readTime: 7,
      likes: 456,
      isBookmarked: true
    }
  ];

  return (
    <div className="news-grid">
      <div className="news-grid-container">
        {sampleNews.map(news => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;