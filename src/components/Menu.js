import React, { useEffect } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';

function Menu({ size, page, handleMenuItemClick }) {
    const [moneySymbol, setMoneySymbol] = useState(() => { const symbol = JSON.parse(localStorage.getItem('moneySymbol')); return symbol ? symbol : "$"; }); // money symbol from local storage ot "$" as a default
    useEffect(() => {
        // Update local storage whenever the moneySymbol state changes
        setMoneySymbol(() => { const symbol = JSON.parse(localStorage.getItem('moneySymbol')); return symbol ? symbol : "$"; });
    }, [page, handleMenuItemClick]);

    return (

        /* menu */
        <ul className={`nav flex-column ${size}`}>

            <li className={`nav-item ${page === "HomePage" ? 'selected' : ''}`}>

                <a className="nav-link" onClick={() => { handleMenuItemClick("HomePage") }}>Home</a>
            </li>

            <li className={`nav-item ${page === "IncomePage" ? 'selected ' : ''}`}>
                <a className="nav-link" onClick={() => { handleMenuItemClick("IncomePage") }}>Income</a>
            </li>

            <li className={`nav-item ${page === "ExpensesPage" ? 'selected ' : ''}`}>
                <a className="nav-link" onClick={() => { handleMenuItemClick("ExpensesPage") }}>Expenses</a>
            </li>

            {/*
            <li className={`nav-item ${page === "AddCategoryPage" ? 'selected ' : ''}`}>
                <a className="nav-link" onClick={() => { handleMenuItemClick("AddCategoryPage") }} >Categories</a>
            </li>
            

            <li className={`nav-item ${page === "CurrencyPickerPage" ? 'selected ' : ''}`}>
                <a className="nav-link" onClick={() => { handleMenuItemClick("CurrencyPickerPage") }} >Currency ({moneySymbol})</a>
            </li>
            */}

            <li className={`nav-item ${page === "SettingsPage" ? 'selected ' : ''}`}>
                <a className="nav-link" onClick={() => { handleMenuItemClick("SettingsPage") }}>Settings <i className="bi bi-gear"></i></a>
            </li>

            <li className={`nav-item ${page === "AddPage" ? 'selected ' : ''}`}>
                <BtnAdd page={page} click={() => { handleMenuItemClick("AddPage") }} />
            </li>


            <div className='smallText '>
                <small className=''>&copy; Shaked Goffer</small>
                <small className=''><a href="https://www.privacypolicies.com/live/6cc6e7cb-c3ac-484c-9b61-83a9684fd61a">Privacy Policies</a></small>
            </div>


        </ul>

        /*  menu withe icons
        
        <ul className={`nav flex-column ${size}`}>
        
                    <li className={`nav-item ${page === "HomePage" ? 'selected' : ''}`}>
                    
                        <a className="nav-link" onClick={() => { handleMenuItemClick("HomePage") }}> <i class="bi bi-house-door"></i> Home</a>
                    </li>

                      <li className={`nav-item ${page === "IncomePage" ? 'selected ' : ''}`}>
                        <a className="nav-link" onClick={() => { handleMenuItemClick("IncomePage") }}> <i class="bi bi-graph-up-arrow"></i> Income</a>
                    </li>
        
                    <li className={`nav-item ${page === "ExpensesPage" ? 'selected ' : ''}`}>
                        <a className="nav-link" onClick={() => { handleMenuItemClick("ExpensesPage") }}> <i class="bi bi-graph-down-arrow"></i> Expenses</a>
                    </li>

                    <li className={`nav-item `}>
                        <a className="nav-link" > <i class="bi bi-bookmark"></i> Categories</a>
                    </li>
        
                    <li className={`nav-item ${page === "AddPage" ? 'selected ' : ''}`}>
                        <BtnAdd page={page} click={() => { handleMenuItemClick("AddPage") }} />
                    </li>
                </ul>
                
                */
    );
}

function BtnAdd({ click, page }) {
    return (
        <button className={`add btn btn-sm-md shadow-lg border-0 rounded-circle p-2 ${page === "AddPage" ? 'btn-primary' : ' btn-outline-primary'}`} onClick={() => { click() }}>
            <i className="bi bi-plus display-6 fs-1 d-flex justify-content-center align-items-center p-1" style={{ width: '100%', height: '100%' }}></i>
        </button>

    );
}

export default Menu