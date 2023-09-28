import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Page_PC from './components/Page_PC'
import Page_mobile from './components/Page_mobile';
import { useState } from 'react';


function App() {

  return (
    <div className="App">

      <div className="bg-light" style={{ minHeight: "100vh" }}>
        {/* Desktop navigation */}
        <div className="desktop-nav">
          <Page_PC />
        </div>

        {/* Mobile navigation */}
        <div className="mobile-nav">
          <Page_mobile />
        </div>

      </div>


    </div>
  );
}


export default App;
