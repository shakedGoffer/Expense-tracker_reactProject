import React from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';

function Menu({ size, page, handleMenuItemClick }) {

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

            <li className={`nav-item ${page === "AddCategoryPage" ? 'selected ' : ''}`}>
                <a className="nav-link" onClick={() => { handleMenuItemClick("AddCategoryPage") }} >Categories</a>
            </li>

            <li className={`nav-item ${page === "AddPage" ? 'selected ' : ''}`}>
                <BtnAdd page={page} click={() => { handleMenuItemClick("AddPage") }} />
            </li>
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
        <button className={`add btn btn-sm-md shadow-lg border-0 rounded-circle ${page === "AddPage" ? 'btn-primary' : ' btn-outline-primary'}`} onClick={() => { click() }}>
            <i className="bi bi-plus display-6 fs-1"></i>
        </button>
    );
}

export default Menu