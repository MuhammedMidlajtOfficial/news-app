// NewsManagement.jsx
import React, { useState, useEffect } from 'react';
import './NewsManagement.css';
import { Plus, Edit, Trash } from 'lucide-react';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });

  // Fetch news
  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:7004/api/news');
      const data = await response.json();
      
      setNews(data?.news);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:7004/api/categories');
      const data = await response.json();
      console.log(data);
      
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7004/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormData({ title: '', content: '', category: '' });
        fetchNews();
      }
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <div className="news-container">
      {/* Create News Form */}
      <div className="create-news-card">
        <div className="card-header">
          <h2><Plus size={20} /> Create News</h2>
        </div>
        <form onSubmit={handleSubmit} className="news-form">
          <input
            type="text"
            placeholder="News Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          
          <textarea
            placeholder="News Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
          
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          
          <button type="submit" className="submit-btn">
            Create News
          </button>
        </form>
      </div>

      {/* Display News List */}
      <div className="news-grid">
        {news.length ? (
          news?.map((item) => (
            <div key={item._id} className="news-card">
              <div className="news-card-header">
                <h3>{item.title}</h3>
                <div className="news-actions">
                  <button className="icon-btn">
                    <Edit size={16} />
                  </button>
                  <button className="icon-btn">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <div className="news-content">
                <p>{item.content}</p>
                <span className="category-tag">
                  {item.category?.categoryName || 'Uncategorized'}
                </span>
              </div>
            </div>
          ))
        ) : "No News Available"}

      </div>
    </div>
  );
};

export default NewsManagement;