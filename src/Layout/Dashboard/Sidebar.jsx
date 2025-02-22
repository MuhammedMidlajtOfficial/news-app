// Sidebar.jsx
import React from 'react';
import { Newspaper, FolderOpen } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Admin Panel</h1>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="/admin/news" className="nav-link">
              <Newspaper className="nav-icon" />
              <span>News</span>
            </a>
          </li>
          
          <li>
            <a href="/admin/category" className="nav-link">
              <FolderOpen className="nav-icon" />
              <span>Category</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;