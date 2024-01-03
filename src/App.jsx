import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "pages/MainPage";
import DetailPage from "pages/DetailPage";
import NotFound from "pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/pokemon/:id" element={<DetailPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>

  )
}

export default App
