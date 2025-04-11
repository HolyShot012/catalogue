import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUS from './components/AboutUs';
import Products from './components/Products';
import CSBH from './components/CSBH';
import FAQ from './components/FAQ';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gioi-thieu" element={<AboutUS />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/csbh" element={<CSBH />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/lien-he" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
};

export default App;