import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NfcLogin from "./pages/nfc-login";
import AssociateMusic from "./pages/associate-music";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NfcLogin/>} />
        <Route path="/associate" element={<AssociateMusic/>} />
      </Routes>
    </Router>
  );
}

export default App;
