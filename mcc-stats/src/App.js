import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//import 'bulma/css/bulma.min.css';
import './styles.css'

import Home from './components/Home';
import Event from './components/Event';
import BackEnd_Landing from './components/backend/BackEnd_Landing';
import BackEnd_AddPlayer from './components/backend/BackEnd_AddPlayer';
import BackEnd_EditPlayer from './components/backend/BackEnd_EditPlayer';
import BackEnd_DeletePlayer from './components/backend/BackEnd_DeletePlayer';

// Main App
export default function App(props) { // setToken is for props
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/event" element={<Event/>}></Route>
          <Route path="/admin" element={<BackEnd_Landing/>}></Route>
          <Route path="/admin/add" element={<BackEnd_AddPlayer/>}></Route>
          <Route path="/admin/edit" element={<BackEnd_EditPlayer/>}></Route>
          <Route path="/admin/delete" element={<BackEnd_DeletePlayer/>}></Route>
        </Routes>
      </Router>
    </div>
  );
  
}