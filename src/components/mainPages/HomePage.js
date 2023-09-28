import React, { useEffect } from 'react'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart_HomePage from '../charts/Chart_HomePage';
import History from '../History';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react';

function HomePage({ list, fullList, deleteItem, moneySymbol, setPage}) {

  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpenses, setSumExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  // Calculate the sum of income and expenses whenever the list changes
  useEffect(() => {
    const calculateSum = (option) => {
      let sum = 0;
      list.forEach(item => {
        if (item.selectedOption === option)
          sum += parseFloat(item.amount);
      });
      return sum;
    }

    const newSumIncome = calculateSum("income");
    const newSumExpenses = calculateSum("expense");
    const newBalance = newSumIncome - newSumExpenses;

    setSumIncome(newSumIncome);
    setSumExpenses(newSumExpenses);
    setBalance(newBalance);
  }, [list]);

  const updatePage = (page)=>{
    if(fullList.length < 1 && (page==="IncomePage" || page==="ExpensesPage"))
     /* show add info toast */
    {toast.info('Click + to add income & expenses', {
      toastId: "toastInfo",// prevents duplications
      closeButton: false,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });}
      
      else
      setPage(page);
    
  }

  return (
    <div className='container py-3'>
      <h1 className='text-capitalize fw-semibold fs-2'>monthly balance:
        <span className={`${balance > 0 ? 'text-success' : 'text-danger'}`}> {balance}{moneySymbol}</span>
      </h1>

      {/* card income & expenses view (HTML) */}
      <div className='row justify-content-around'>
        <Card sum={sumIncome} liable="income" moneySymbol={moneySymbol} updatePage={updatePage}/>
        <Card sum={sumExpenses} liable="expenses" moneySymbol={moneySymbol} updatePage={updatePage}/>
      </div>
      <CardAdd updatePage={updatePage}/>

      <Chart_HomePage fullList={fullList} moneySymbol={moneySymbol}/>

      <div className='mt-5'>
        <div className='col-10 border-bottom border-2 fs-4'>Monthly History</div>
        <History list={list.slice(-10).reverse()} deleteItem={deleteItem} moneySymbol={moneySymbol} />
      </div>
    </div>
  );
}

{/* card income & expenses */ }
function Card({ liable, sum ,moneySymbol, updatePage}) {
  return (
    <div className="card col-11 col-sm-5 my-2 shadow border-0" onClick={()=>{liable === "income" ? updatePage("IncomePage"):updatePage("ExpensesPage")}}>
      <div className="card-body text-center fw-normal py-5 center">
        <p className="card-title text-capitalize fs-2">{liable}</p>
        <p className={`card-text  fs-2 ${liable === "income" ? "text-success" : (liable === "expenses" ? "text-danger" : "text-dark")}`}>{sum}{moneySymbol}</p>
      </div>
    </div>
  );
}

{/* card add btn */ }
function CardAdd({updatePage}) {
  return (
    <div className="mx-1 mx-sm-0 col-sm-12  my-2 shadow border-0"  role="button" onClick={()=>{updatePage("AddPage")}}>
      <div className="card-body text-center fw-normal py-2 center bg-white">
        <p className="card-title text-capitalize fs-2"> <i className="bi bi-plus display-6 fs-1 d-flex justify-content-center align-items-center p-1" style={{ width: '100%', height: '100%' }}></i></p>
      </div>
    </div>
  );
}





export default HomePage