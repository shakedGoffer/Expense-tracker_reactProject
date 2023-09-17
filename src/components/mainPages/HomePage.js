import React, { useEffect } from 'react'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart_HomePage from '../charts/Chart_HomePage';
import History from '../History';
import { useState } from 'react';

function HomePage({ list, fullList, deleteItem, moneySymbol}) {

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

  return (
    <div className='container py-3'>
      <h1 className='text-capitalize fw-semibold fs-2'>monthly balance:
        <span className={`${balance > 0 ? 'text-success' : 'text-danger'}`}> {balance}{moneySymbol}</span>
      </h1>

      {/* card income & expenses view (HTML) */}
      <div className='row justify-content-around'>
        <Card sum={sumIncome} liable="income" moneySymbol={moneySymbol}/>
        <Card sum={sumExpenses} liable="expenses" moneySymbol={moneySymbol}/>
      </div>

      <Chart_HomePage fullList={fullList} moneySymbol={moneySymbol}/>

      <div className='mt-5'>
        <div className='col-10 border-bottom border-2 fs-4'>Monthly History</div>
        <History list={list.slice(-10).reverse()} deleteItem={deleteItem} moneySymbol={moneySymbol} />
      </div>
    </div>
  );
}

{/* card income & expenses */ }
function Card({ liable, sum, list,moneySymbol}) {
  return (
    <div className="card col-11 col-sm-5 my-2 shadow border-0">
      <div className="card-body text-center fw-normal py-5 center">
        <p className="card-title text-capitalize fs-2">{liable}</p>
        <p className={`card-text  fs-2 ${liable === "income" ? "text-success" : (liable === "expenses" ? "text-danger" : "text-dark")}`}>{sum}{moneySymbol}</p>
      </div>
    </div>
  );
}





export default HomePage