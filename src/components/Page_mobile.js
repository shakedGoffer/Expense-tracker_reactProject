import React from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Screen from "./Screen";
import Menu from "./Menu"
import { useState } from 'react';

function Page_mobile() {
    const [page, setPage] = useState("HomePage");
    
    return (
        <div className=''>
            <Navbar size="mobile" page={page} setPage={setPage} />
            <div className=''>
                <Screen page={page} setPage={setPage} />
            </div>
        </div>
    );
}

const Navbar = ({ size, page, setPage }) => {
    const [openNav, setOpenNav] = useState(false);

    const handleMenuIconClick = () => {
        setOpenNav(!openNav);
    }

    const handleMenuItemClick = (pageName) => {
        setPage(pageName);
        setOpenNav(false);
    }

    return (
        <> {/* App header */}
            <header className={`App-header border-bottom py-2 pt-3 bg-white d-flex align-items-center justify-content-between ${openNav ? '' : 'sticky-top'}`}>
                {/* App title */}
                <h1 className='display-5 col text-uppercase m-0 text-center stretched-font'>Cash view</h1>

                <i className={`bi navBarIcon col-auto px-2 ${openNav ? 'bi-x' : 'bi-list'}`} onClick={handleMenuIconClick} style={{ zIndex: '2' }}></i>
            </header>

            {openNav && (
                <div className={`bg-white text-center col-12 center menu ${size}`} style={{ height: "100%", position: "fixed", top: "0", zIndex: "1" }}>
                    <Menu size={size} page={page} setPage={setPage} handleMenuItemClick={handleMenuItemClick} />
                </div>
            )}
        </>

    );
}



export default Page_mobile