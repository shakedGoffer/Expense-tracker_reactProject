import React, { useEffect } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

{/* History (income / expenses) */ }
function History({ list, deleteItem, moneySymbol }) {

    const [selectedItem, setSelectedItem] = useState(null);
  
    /* returns the full name category (from select value --> cat) !! no need !! */
    const getFullCategory = (cat) => {
      let fullCategory = "";
      switch (cat) {
        case "Sports_Gym":
          fullCategory = "Sports & Gym";
          break;
        case "Food_Drinks":
          fullCategory = "Food & Drinks";
          break;
        case "Clothing_shoes":
          fullCategory = "Clothing & shoes";
          break;
        case "Medical_Healthcare":
          fullCategory = "Medical & Healthcare";
          break;
        default:
          fullCategory = cat;
          break;
      }
  
      return fullCategory;
    };
  
    return (
      <div className='div_historyList'>
        <ul className='list-group mt-3 history'>
          {/* Map over array */}
          {list.map((item, index) => (
            <HistoryItem key={index}  item={item} moneySymbol={moneySymbol} onItemClick={(item) => { setSelectedItem(item) }} />
          ))}
        </ul>
  
        {/* Item details box */}
        {selectedItem && (
          <ItemDetailsBox item={selectedItem} moneySymbol={moneySymbol} onClose={() => { setSelectedItem(null) }} deleteItem={deleteItem} />
        )}
      </div>
    );
  }
  
  {/* History item (income / expenses) */ }
  function HistoryItem({ item, onItemClick,moneySymbol }) {
    const { id, selectedOption, amount, category, description, date } = item;
  
    return (
      <li className={`border-end border-5 rounded p-3 my-2 bg-white shadow ${selectedOption == 'income' ? "border-success" : "border-danger"}`} key={id} onClick={() => onItemClick(item)}>
        <div className='row justify-content-between'>
          <div className='col fs-5 text-lowercase prevent-overflow'>{category == "" ? selectedOption : category}</div>
          <div className={`col-auto fs-5 prevent-overflow ${selectedOption == 'income' ? "text-success" : "text-danger"}`}>{selectedOption == 'income' ? "+" + amount : "-" + amount}{moneySymbol}</div>
        </div>
      </li>
    );
  }
  
  {/* on history item click a pop up box show withe all the item details */ }
  function ItemDetailsBox({ item, onClose, deleteItem,moneySymbol }) {
    const { id, selectedOption, amount, category, description, date } = item;
  
    // Handle clicking outside the box to close the pop-up
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (e.target.classList.contains('item-details-box-overlay')) {
          onClose();
        }
      };
  
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [onClose]);
  
    return (
      <div className='item-details-box-overlay'>
        <div className='item-details-box p-4 col-11 col-sm-5 bg-white mt-5 rounded'>
          <div className='row  fs-3'>
            {/* box title */}
            <div className='title col center-vertically'>Item Details</div>
            {/* box close button */}
            <button className='btn btn-light text-secondary border-0 col-auto btn-lg ' onClick={onClose}>X</button>
          </div>
  
          {/* box Details */}
          <div className='details mt-3 fs-6 fw-bold'>
            <div>Type: <ItemDetailsText text={selectedOption} /> </div>
            <div>Category: <ItemDetailsText text={category} /></div>
            <div>Amount: <ItemDetailsText text={amount + moneySymbol} /></div>
            <div>Description: <ItemDetailsText text={description} /></div>
            <div>Date: <ItemDetailsText text={date.day + "/" + date.month + "/" + date.year} /></div>
            <div>ID: <ItemDetailsText text={id} /></div>
          </div>
  
          <button className='btn btn-danger mt-3 ' onClick={() => { deleteItem(item); onClose(); }}>Delete Item</button>
        </div>
      </div>
    );
  }

  {/* detail text (style different) */ }
  function ItemDetailsText({ text }) {
    return (
      <span className='fw-normal text-break single-line-ellipsis'>{text}</span>
    );
  }

export default History