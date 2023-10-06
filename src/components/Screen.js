import React, { useEffect, useState } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages import
import HomePage from './mainPages/HomePage';
import AddPage from './mainPages/AddPage';
import Expenses_Income_Page from './mainPages/Expenses_Income_Page';
import AddCategoryPage from './mainPages/AddCategoryPage';
import CurrencyPickerPage from './mainPages/CurrencyPickerPage';
import EditItemPage from './mainPages/EditItemPage';
import SettingsPage from './mainPages/SettingsPage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Screen({ page, setPage }) {
  const [list, setList] = useState(() => { const storedList = JSON.parse(localStorage.getItem('list')); return Array.isArray(storedList) ? storedList : []; }); // list from local storage or [] as a default
  const [monthList, setMonthList] = useState([]);
  const [moneySymbol, setMoneySymbol] = useState(() => { const symbol = JSON.parse(localStorage.getItem('moneySymbol')); return symbol ? symbol : "$"; }); // money symbol from local storage ot "$" as a default
  const [selectedItem, setSelectedItem] = useState("");

  // sort and create a monthList only items (when state list changes)
  useEffect(() => {
    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based, so add 1
    const currentYear = currentDate.getFullYear();

    // Filter the items from the list that are in the current month and year
    const filteredList = list.filter(item => {
      if (item.date.year === currentYear && item.date.month === currentMonth) {
        return item;
      }
    });

    // Set the filtered list as the monthList state
    setMonthList(filteredList);
  }, [list]);

  // Update local storage whenever the list state changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);


  /* Auto scroll to the top when page changes */
  useEffect(() => { window.scrollTo(0, 0); }, [page, setPage]);

  /* delete item (triggers MonthList update + local storage update) */
  const deleteItem = (item, option) => {
    if (option === "delate") {
      const updatedList = list.filter((listItem) => listItem !== item); // Use the filter method to create a new list without the item to be deleted
      setList(updatedList);  // Update the state with the new list

      /* show delete toast */
      const isToastEnabled = localStorage.getItem('ToastMessagesSwitch') ? JSON.parse(localStorage.getItem('ToastMessagesSwitch')) : true;

      if (isToastEnabled === true) {
        toast('🗑️ Item deleted', {
          closeButton: false,
          position: "top-right",
          className: "text-capitalize",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    else {
      setSelectedItem(item);
      setPage("EditItemPage");
    }
  }


  // Define a mapping object for components
  const pageComponents = {
    HomePage: <HomePage list={monthList} fullList={list} deleteItem={deleteItem} moneySymbol={moneySymbol} setPage={setPage} />,
    AddPage: <AddPage list={list} setList={setList} setPage={setPage} />,
    EditItemPage: <EditItemPage list={list} setList={setList} setPage={setPage} item={selectedItem || ""} />,
    ExpensesPage: <Expenses_Income_Page fullList={list} deleteItem={deleteItem} type="expense" moneySymbol={moneySymbol} />,
    IncomePage: <Expenses_Income_Page fullList={list} deleteItem={deleteItem} type="income" moneySymbol={moneySymbol} />,
    //CurrencyPickerPage: <CurrencyPickerPage moneySymbol={moneySymbol} setMoneySymbol={setMoneySymbol} />,
    SettingsPage: <SettingsPage moneySymbol={moneySymbol} setMoneySymbol={setMoneySymbol} setPage={setPage} />,
    //AddCategoryPage: <AddCategoryPage />,
  };

  return (

    // Render the component based on the page value
    <>
      <ToastContainer />
      {pageComponents[page] || setPage("HomePage")}
    </>
  );
}

export default Screen