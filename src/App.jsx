import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Education from './pages/Education';

function App() {
  return (
    <BrowserRouter>
    <div>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="education" element={<Education />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
