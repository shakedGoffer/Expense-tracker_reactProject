import React, { useEffect } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Screen from "./Screen";
import Menu from "./Menu"
import { useState } from 'react';

function Page_PC() {
  const [page, setPage] = useState("HomePage");
  
    
  const handleMenuItemClick = (pageName) => {
    setPage(pageName);
    window.scrollTo(0, 0);
}
  return (
    <div className='container-fluid row m-0 p-0 '>
      
      {/* App header */}
      <header className="App-header border-bottom py-sm-2 bg-white sticky-top">
        {/* App title */}
        <h1 className=' display-5 text-uppercase text-center stretched-font'>Cash view</h1>
      </header>

      {/* Right sid - navbar */}
      <div id='left' className='col-3 border-end bg-white p-0' style={{ minHeight: "100vh" }}>
        <div className='container col-3 position-fixed' >
          <Menu size="desktop" page={page} setPage={setPage} handleMenuItemClick={handleMenuItemClick}/>
        </div>
      </div>


      {/* Left sid - screen */}
      <div id='right' className='col-9 p-5'>
        <Screen page={page} setPage={setPage} />
      </div>
    </div>
  );
}




export default Page_PC