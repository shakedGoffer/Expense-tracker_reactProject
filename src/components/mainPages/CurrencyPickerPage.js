import React, { useEffect, useState } from 'react'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import currencyData from '../../Currencies.json';


function CurrencyPickerPage({ moneySymbol, setMoneySymbol }) {

    useEffect(() => {
        // Update local storage whenever the moneySymbol state changes
        localStorage.setItem("moneySymbol", JSON.stringify(moneySymbol));
    }, [moneySymbol, setMoneySymbol]);

    return (
        <div className='pt-4'>
            <CurrencyPicker moneySymbol={moneySymbol} setMoneySymbol={setMoneySymbol} />
        </div>

    )
}



function CurrencyPicker({ moneySymbol, setMoneySymbol }) {
    const currencySymbols = Object.keys(currencyData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCurrencyChange = (symbol) => {
        setMoneySymbol(symbol);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCurrencies = currencySymbols.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={` p-0 `}>
            <div className=" px-1  align-items-center">
                <div className='col-12 fs-3'>Currency</div>
                <small className='text-secondary'>Selected Currency: {moneySymbol}</small>
            </div>

            <form className='pt-3'>
                <input type="text" label="input" name="input" className="form-control mb-2 fs-5" placeholder="Search currencies" value={searchTerm} onChange={handleSearchTermChange}></input>
                <ul className="list-group">
                    {filteredCurrencies.map((item, index) => (
                        <CurrencyOption key={index} item={item} onSelect={() => handleCurrencyChange(currencyData[item].symbol_native)} isSelected={currencyData[item].symbol_native === moneySymbol} />))}
                </ul>
            </form>

        </div>
    );
}

function CurrencyOption({ item, onSelect, isSelected }) {
    const currencyInfo = currencyData[item];

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={onSelect} style={{ cursor: 'pointer' }} >
            <div>{currencyInfo.code} - {currencyInfo.name_plural} ({currencyInfo.symbol_native}) </div>
            <input type="radio" label="input" name="input" checked={isSelected} readOnly></input>
        </li>
    );
}




export default CurrencyPickerPage