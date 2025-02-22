// NewsHeader.jsx
import React, { useState } from 'react';
import { Menu, Search, Bell, User, X } from 'lucide-react';
import './NewsHeader.css';

const NewsHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navItems = [
    { name: 'Trending', href: '#' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-main">
          {/* Logo and brand */}
          <div className="logo">
            <span className="logo-text">NewsApp</span>
          </div>

          {/* Desktop Navigation */}
          {/* <nav className="desktop-nav">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
          </nav> */}

          {/* Search bar */}
          {/* <div className="search-container">
            <div className="search-wrapper">
              <Search className={`search-icon ${searchFocused ? 'focused' : ''}`} />
              <input
                type="text"
                placeholder="Search news..."
                className="search-input"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div> */}

          {/* User actions */}
          <div className="user-actions">
            {/* <button className="icon-button">
              <Bell />
            </button> */}
            <button className="icon-button">
              <User />
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        {/* <nav className="mobile-nav">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="mobile-nav-link">
              {item.name}
            </a>
          ))}
        </nav> */}
        {/* <div className="mobile-search">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search news..."
              className="search-input"
            />
          </div>
        </div> */}
        <div className="mobile-user-actions">
          {/* <button className="icon-button">
            <Bell />
          </button> */}
          <button className="icon-button">
            <User />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NewsHeader;