import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "pages/MainPage";
import DetailPage from "pages/DetailPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/pokemon/:id" element={<DetailPage />}></Route>
      </Routes>
    </Router>

  )
}

export default App
