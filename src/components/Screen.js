import React, { useEffect, useState } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './mainPages/HomePage';
import AddPage from './mainPages/AddPage';
import Expenses_Income_Page from './mainPages/Expenses_Income_Page';
import AddCategoryPage from './mainPages/AddCategoryPage';

function Screen({ page, setPage }) {
  const [list, setList] = useState(() => {const storedList = JSON.parse(localStorage.getItem('list')); return Array.isArray(storedList) ? storedList : [];}); // list from local storage or [] as a default
  const [monthList, setMonthList] = useState([]);

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


  /* delete item (triggers MonthList update + local storage update) */
  const deleteItem = (item) => {
    const updatedList = list.filter((listItem) => listItem !== item); // Use the filter method to create a new list without the item to be deleted
    setList(updatedList);  // Update the state with the new list
  }


  // Define a mapping object for components
  const pageComponents = {
    HomePage: <HomePage list={monthList} fullList={list} deleteItem={deleteItem} />,
    AddPage: <AddPage list={list} setList={setList} />,
    ExpensesPage: <Expenses_Income_Page fullList={list} deleteItem={deleteItem} type="expense" />,
    IncomePage: <Expenses_Income_Page fullList={list} deleteItem={deleteItem} type="income" />,
    AddCategoryPage: <AddCategoryPage />,
  };


  return (
    // Render the component based on the page value
    <>
      {pageComponents[page]}
    </>
  );
}

export default Screen