import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Website/Home';
import './App.css';
import CategoryPage from "./Pages/Dashboard/Category";
import NewsPage from "./Pages/Dashboard/News";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/news" element={<NewsPage />} />
        <Route path="/admin/category" element={<CategoryPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
