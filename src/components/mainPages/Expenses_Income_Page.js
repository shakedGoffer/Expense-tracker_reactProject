import React, { useEffect, useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import History from '../History';
import PieChart from '../charts/PieChart';
import MultitypeChart from '../charts/MultitypeChart';

// Expenses and Income Page (details + totals + charts)
function Expenses_Income_Page({ fullList, deleteItem, type, moneySymbol }) {

  /* arr of month names (index = month num) */
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // current date
  const currentDate = new Date(); // Extract individual date verbals
  const [month, setMonth] = useState(currentDate.getMonth() + 1); // Note: Months are zero-based, so add 1
  const [year, setYear] = useState(currentDate.getFullYear());
  const [timeLine, setTimeLin] = useState("monthly"); // List of all the expenses / income items, this list will be filter and shown to the user

  const [list, setList] = useState(fullList.filter(item => {
    if (item.selectedOption === type) return item;
  }));

  // selected category state (select div above BatChart)
  const [selectedCategory, setSelectedCategory] = useState(type == 'expense' ? 'Expenses' : 'Income');
  useEffect(() => {
    setSelectedCategory(type == 'expense' ? 'Expenses' : 'Income');
  }
    , [type, list,]);

  // update list when month, year, fullList,selectedCategory (delete item ) or timeLine changes (rerenders) 
  useEffect(() => {
    const filteredList = fullList.filter(item => {
      if (timeLine === "yearly") return item.date.year === year && item.selectedOption === type;
      return item.date.year === year && item.date.month === month && item.selectedOption === type;
    });
    setList(filteredList);
  }, [month, year, fullList, timeLine, type]);

  const [filteredHistoryList, setFilteredHistoryList] = useState([]);
  // Update filtered history list when selectedCategory or the original list changes
  useEffect(() => {
    // Check if selectedCategory is not one of the predefined options
    if (selectedCategory !== 'Expenses' && selectedCategory !== 'Income' && selectedCategory !== 'Summary') {
      const filteredItems = list.filter((item) => item.category === selectedCategory);
      setFilteredHistoryList(filteredItems);
    } else {
      // If selectedCategory is one of the predefined options, set filtered history list to the entire list
      setFilteredHistoryList(list);
    }
  }, [selectedCategory, list,]);

  // handle moving to the previous month / year
  const handlePrev = () => {
    // if time line = monthly
    if (timeLine === "monthly") {
      if (month === 1) {
        // If the current month is January, switch to December of the previous year
        setMonth(12);
        setYear(prevYear => prevYear - 1);
      } else {
        // Otherwise, just switch to the previous month
        setMonth(prevMonth => prevMonth - 1);
      }
    } // if time line = yearly
    else if (timeLine === "yearly") {
      setYear(prevYear => prevYear - 1);
    }
  };

  // Function to handle moving to the next month / year
  const handleNext = () => {
    // if time line = monthly
    if (timeLine === "monthly") {
      // If the date is on or after the current date (month + year), don't allow moving to the next month
      if (month >= currentDate.getMonth() + 1 && year >= currentDate.getFullYear()) return; else {
        if (month === 12) {
          // If the current month is December, switch to January of the next year
          setMonth(1);
          setYear(prevYear => prevYear + 1);
        } else {
          // Otherwise, just switch to the next month
          setMonth(prevMonth => prevMonth + 1);
        }
      }
    }
    // if time line = yearly
    else if (timeLine === "yearly") {
      // If the date is on or after the current date (year), don't allow moving to the next year
      if (year >= currentDate.getFullYear()) return; else {
        setYear(prevYear => prevYear + 1);
      }
    }
  };

  // on time line change (monthly / yearly) update stat + month / year
  const handleTimLineChange = time => {
    if (time === "yearly") {
      setMonth("");
      setYear(currentDate.getFullYear());
    } else if (time === "monthly") setMonth(currentDate.getMonth() + 1);

    setYear(currentDate.getFullYear());
    setTimeLin(time);
  };

  return (

    <div className='container'>

      {/* date scroll + timeline*/}
      <div className='container m-0'>

        { /* date + arrows to pass */}
        <div className='text-center row m-0 pt-3 d-flex justify-content-around'>
          <button className='col-auto text-center btn btn-lg fs-4 px-2' onClick={handlePrev}>&lt;</button>
          <div className='col fs-3 center text-center'> {year} {monthNames[month - 1]} </div>
          <button className='col-auto text-center btn btn-lg fs-4 px-2' onClick={handleNext}>&gt;</button>
        </div>

        { /* time line (monthly / yearly) */}
        <div className=" d-flex justify-content-between text-center timeLine pt-3">
          <input className={` rounded col-6 text-center ${timeLine == "monthly" ? "selected" : null}`} label="Monthly" type="radio" name="timeLine" value="Monthly" onClick={()=>{handleTimLineChange("monthly");}} onKeyDown={()=>{handleTimLineChange("monthly");}} ></input>
          <input className={` rounded col-6 text-center ${timeLine == "yearly" ? "selected" : null}`} label="Yearly" type="radio" name="timeLine" value="Yearly" onClick={()=>{handleTimLineChange("yearly");}} onKeyDown={()=>{handleTimLineChange("yearly");}} onChange={()=>{handleTimLineChange("yearly");}}></input>
        </div>

      </div>


      { /* if list is empty (no expenses/income) show message + hide charts, totals and history*/}
      <div>  {(list.length > 0) ?
        <>

          { /* if type = expenses show category split */}
          <div className='mt-5'> {type === "expense" && <PieChart_categories list={list} type={type} moneySymbol={moneySymbol} />} </div>

          { /* if time line = yearly, add a bar chart of the expenses / income split (in months) */}
          <div className='mt-5'>  {(timeLine == "yearly") && <BarChart list={list} labels={monthNames} type={type} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} moneySymbol={moneySymbol} />} </div>

          <Totals timeLine={timeLine} list={filteredHistoryList} type={type} moneySymbol={moneySymbol} />

          { /* history list */}
          <div className='mt-5'>
            <div className='col-11 border-bottom border-2 fs-4'>History</div>
            <History list={filteredHistoryList.slice().reverse()} deleteItem={deleteItem} moneySymbol={moneySymbol} />
          </div>

        </>
        : <NoData type={type} text={timeLine == "yearly" ? year : monthNames[month - 1] + " " + year} />}

      </div>
    </div>
  );
}

function NoData({ type, text }) {

  return (
    <div className="text-center fs-2 text-capitalize center my-5">
      no {type === "expense" ? "expenses" : "income"} in {text}
    </div>
  );

}


function Totals({ timeLine, list, type, moneySymbol }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // Calculate total expenses / income when the list changes
    const total = list.reduce((total, item) => total + parseFloat(item.amount), 0);
    setTotal(total);
  }, [list]);

  return <div className='mt-5'>
    <div className='col-11 border-bottom border-2 fs-4'>Totals</div>
    <div className=" row justify-content-around mt-3">

      { /* total (monthly / yearly) expenses / income */}
      <div className='col-auto total d-flex flex-column align-items-center amount'>
        <span className='fs-4'>{total.toFixed(2)}{moneySymbol}</span>
        <small className='text-capitalize amount'> total {type}</small>
      </div>

      { /* weekly / monthly average */}
      <div className='col-auto total d-flex flex-column align-items-center amount'>
        <span className='fs-4 text-start'>{timeLine == "monthly" ? (total / 4).toFixed(2) : (total / 12).toFixed(2)}{moneySymbol}</span>
        <small className='text-capitalize amount'>avg{timeLine == "monthly" ? " weekly" : " monthly"}</small>
      </div>

      {  /* daily / weekly average */}
      <div className='col-auto total d-flex flex-column align-items-center amount'>
        <span className='fs-4 text-start'>{timeLine == "monthly" ? (total / 4 / 7).toFixed(2) : (total / 12 / 4).toFixed(2)}{moneySymbol}</span>
        <small className='text-capitalize amount'>avg{timeLine == "monthly" ? " daily" : " weekly"}</small>
      </div>

      
    </div>
  </div>;
}

// Bar chart that shows the expenses / income month split
function BarChart({ list, labels, type, selectedCategory, setSelectedCategory, moneySymbol }) {

  const [expensesData, setExpensesData] = useState(new Array(12).fill(0)); // Use state for expensesData

  // Calculate the expenses / income (and categoris spit) for each month, update when month, year, fullList (delete item ) or timeLine changes (rerenders) 
  useEffect(() => {
    const newExpensesData = new Array(12).fill(0);
    list.forEach(item => {
      const month = item.date.month - 1; // Months are zero-based
      if (selectedCategory === 'Expenses' || selectedCategory === 'Income' || selectedCategory === 'Summary') {
        newExpensesData[month] += parseFloat(item.amount);
      } else if (item.category === selectedCategory) {
        newExpensesData[month] += parseFloat(item.amount);
      }
    });

    setExpensesData(newExpensesData); // Update expensesData state
  }, [type, list, selectedCategory,]);

  // update select (categories) when type (income / expense) changes
  useEffect(() => {
    document.getElementById("Categories").value = type === "expense" ? "Expenses" : type;
  }, [type]);


  // Prepare data for the bar chart
  const chartData = {
    labels,
    datasets: [{
      type: 'bar',
      label: selectedCategory,
      data: expensesData,
      backgroundColor: categoryColors[selectedCategory],
      borderColor: 'white',
      borderWidth: 2,
    }]
  };

  // Calculate the total expenses / income for all categories
  let total = 0;
  expensesData.forEach(amount => { total += amount; });

  /* options  */
  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 16 // Font size for the x-axis (months) labels
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 16 // Font size for the y-axis (amounts) labels
          }
        },
        beginAtZero: true, // Start y-axis at 0
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18 // Label font size for the legend
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Tooltip background color
        titleFont: {
          size: 16 // Tooltip title font size
        },
        bodyFont: {
          size: 15 // Tooltip body font size
        },
        callbacks: {
          title: () => '',
          // Return an empty string to hide the tooltip title
          label: context => {
            const datasetLabel = context.dataset.label;
            const cleanedValue = context.formattedValue.replace(/[^0-9.-]/g, ''); // Remove non-numeric characters
            const categoryAmount = parseFloat(cleanedValue);
            const percentage = ((categoryAmount / total) * 100).toFixed(2); // Calculate the percentage

            return `${datasetLabel}: ${type === 'expense' ? '-' : ''}${context.formattedValue + moneySymbol} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className={`form-group selectDiv p-0 mb-3 ${type == "expense" ? 'showExpense_Categories' : ''}`}>
        <select className="form-select text-capitalize" id="Categories" onChange={(e) => { setSelectedCategory(e.target.value) }}>
          <option defaultValue value="Expenses">All Expenses</option>
          <option value="Summary">Summary</option>
          <option value="Fun">Fun</option>
          <option value="Sports & Gym">Sports & Gym</option>
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Clothing & Shoes">Clothing & Shoes</option>
          <option value="Medical & Healthcare">Medical & Healthcare</option>
          <option value="Home & Utilities">Home & Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Gifts">Gifts</option>
          <option value="Other">Other</option>
          <option value="No Category">No Category</option>
        </select>
      </div>

      {selectedCategory === "Summary" ? <BarChart2 list={list} labels={labels} type={type} moneySymbol={moneySymbol} /> : <MultitypeChart data={chartData} options={options} height={window.innerWidth >= 768 ? null : "400"} />}
    </>
  );
}


// Bar chart that shows the expenses / income month split + categories
function BarChart2({ list, labels, type, moneySymbol }) {
  // Create an array to hold the total expenses / income for each month
  const months = [...Array(12).keys()];
  const datasets = {};

  // Calculate the total expenses / income for each month and category
  list.forEach(item => {
    const month = item.date.month - 1; // Months are zero-based
    const category = item.category || 'No Category';

    // Initialize datasets for each category
    if (!datasets[category]) {
      datasets[category] = new Array(12).fill(0);
    }

    datasets[category][month] += parseFloat(item.amount);
  });


  // Calculate the total expenses / income for all categories
  const categoryTotals = {};
  list.forEach(item => {
    const category = item.category || 'No Category';
    categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(item.amount);
  });

  // Prepare data for the bar chart
  const chartData = {
    labels,
    datasets: Object.keys(datasets).map(category => ({
      label: category,
      data: datasets[category],
      backgroundColor: categoryColors[category],
      borderColor: 'white',
      borderWidth: 2,
      stack: 'stack1', // Assign a common stack name to stack the bars
    })),
  };

  // Calculate the total expenses / income for all categories
  let total = 0;
  list.forEach(item => (total += parseFloat(item.amount)));

  /* options  */
  const options = {

    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 16, // Font size for the x-axis (months) labels
          },
        },
      },
      y: {
        stacked: true,
        ticks: {
          font: {
            size: 16, // Font size for the y-axis (amounts) labels
          },
        },
        beginAtZero: true, // Start y-axis at 0
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18, // Label font size for the legend
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Tooltip background color
        titleFont: {
          size: 16, // Tooltip title font size
        },
        bodyFont: {
          size: 15, // Tooltip body font size
        },
        callbacks: {
          label: context => {
            const datasetLabel = context.dataset.label;
            const cleanedValue = context.formattedValue.replace(/[^0-9.-]/g, ''); // Remove non-numeric characters
            const categoryAmount = parseFloat(cleanedValue);
            const percentage = ((categoryAmount / total) * 100).toFixed(2); // Calculate the percentage

            if (type === 'expense') {
              return `${datasetLabel}: -${context.formattedValue + moneySymbol} (${percentage}%)`;
            }
            return `${datasetLabel}: ${context.formattedValue + moneySymbol} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <MultitypeChart data={chartData} options={options} height={window.innerWidth >= 768 ? null : "400"} />;
}

// pie chart that shows the expenses / income split, in the time line and date chosen
function PieChart_categories({ list, type, moneySymbol }) {

  // Calculate the total expenses / income for each category in the selected month
  const categoryTotals = {};
  list.forEach(item => {
    const category = item.category || 'No Category';
    categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(item.amount);
  });


  // Prepare data for the pie chart
  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: Object.keys(categoryTotals).map(category => categoryColors[category])
    }]
  };

  // Calculate the total expenses / income for all categories
  const total = Object.values(categoryTotals).reduce((total, amount) => total + amount, 0);

  /* options for the pie chart */
  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow the aspect ratio to be adjusted 
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18 // Label font size for the legend

          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Tooltip background color
        titleFont: {
          size: 16 // Tooltip title font size
        },
        bodyFont: {
          size: 15 // Tooltip body font size
        },
        callbacks: {
          title: () => '', // Return an empty string to hide the tooltip title
          label: context => {
            const datasetLabel = context.label;
            const cleanedValue = context.formattedValue.replace(/[^0-9.-]/g, ''); // Remove non-numeric characters
            const categoryAmount = parseFloat(cleanedValue);
            const percentage = (categoryAmount / total * 100).toFixed(2); // Calculate the percentage
            if (type == 'expense')
              return `${datasetLabel}: -${context.formattedValue + moneySymbol} (${percentage}%)`;
            return `${datasetLabel}: ${context.formattedValue + moneySymbol} (${percentage}%)`;
          }
        }
      }
    }
  };

  return <PieChart data={chartData} width={window.innerWidth >= 768 ? 600 : 450} height={window.innerWidth >= 768 ? 600 : 450} options={options} />;
}


// Map each category to a specific color
const categoryColors = {
  'Expenses': 'rgb(220, 53, 69)',
  'Income': 'rgb(25, 135, 84)',
  "Fun": '#FF6B6B',
  "Sports & Gym": '#FFD166',
  "Food & Drinks": '#06D6A0',
  "Clothing & Shoes": '#118AB2',
  "Medical & Healthcare": '#073B4C',
  "Transportation": '#EF476F',
  "Home & Utilities": '#61C0BF',
  "Gifts": '#F9A828',
  "Other": '#8A2BE2',
  "No Category": '#808080', // For items with no category

  "Entertainment": '#FF9333',
  "Technology": '#51C4D3',
  
};

/* Map each category to a specific color --old
const categoryColors = {
  "Fun": '#FF0000',
  "Sports & Gym": '#FF7F00',
  "Food & Drinks": '#FFFF00',
  "Clothing & Shoes": '#00FF00',
  "Medical & Healthcare": '#0000FF',
  "Transportation": '#4B0082',
  "Other": '#8A2BE2',
  "No Category": '#808080', // For items with no category


  "Entertainment": '#A52A2A',
  "Home & Utilities": '#7FFF00',
  "Technology": '#00FFFF',
  "Gifts & Donations": '#DC143C',
};*/





export default Expenses_Income_Page;