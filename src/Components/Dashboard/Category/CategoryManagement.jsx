import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import './CategoryManagement.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);


  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    console.log("Base URL:", process.env.REACT_APP_BASE_URL);

    fetchCategories();
  }, []);

  // Handle category creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName }),
      });
      
      if (response.ok) {
        setCategoryName('');
        fetchCategories();
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  // Handle category deletion
  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Handle category update
  const handleUpdate = async (categoryId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName: editingCategory.name }),
      });
      
      if (response.ok) {
        setEditingCategory(null);
        fetchCategories();
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="category-container">
      <div className="create-category-card">
        <div className="card-header">
          <h2><Plus size={20} /> Create Category</h2>
        </div>
        <form onSubmit={handleSubmit} className="category-form">
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            Create Category
          </button>
        </form>
      </div>

      <div className="category-grid">
        {categories?.map((category) => (
          <div key={category._id} className="category-card">
            {editingCategory?.id === category._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({
                    ...editingCategory,
                    name: e.target.value
                  })}
                />
                <div className="edit-actions">
                  <button
                    onClick={() => handleUpdate(category._id)}
                    className="save-btn"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="category-content">
                <h3>{category.categoryName}</h3>
                <div className="category-actions">
                  <button
                    className="icon-btn edit"
                    onClick={() => setEditingCategory({
                      id: category._id,
                      name: category.categoryName
                    })}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(category._id)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;