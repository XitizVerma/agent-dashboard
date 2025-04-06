import React from 'react';
import './App.css';
import {HomePage} from "./components/HomePage";
import {LoginPage} from "./components/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<HomePage />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
