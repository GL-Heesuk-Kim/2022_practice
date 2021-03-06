// import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </div> 
    </Router>
  );
}

export default App;

// function Home() {
//   return (
//     <div>
//       <h2>Home 안녕하세요 ~</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About 어바웃 페이지 </h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard ???</h2>
//     </div>
//   );
// }
