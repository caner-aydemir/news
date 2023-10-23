import React, {createContext, useContext, useEffect, useState} from 'react'
import {Route, Routes,Navigate} from "react-router";
import {BrowserRouter as Router, useParams, MemoryRouter, HashRouter} from "react-router-dom";
import HomePage from "../src/Components/Pages/HomePage";
import Hakkimizda from "./Components/Pages/Hakkimizda";
import NewsContent from "./Components/Pages/NewsContent";
import CategoryContent from "./Components/Layouts/CategoryContent";
function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path={`news/:category`} element={<CategoryContent/>}/>
            <Route path={`news/:category/:randomID`} element={<NewsContent/>}/>
            {/*<Route path="*" element={<Page404/>}/>*/}
        </Routes>
    )
}

export default App;