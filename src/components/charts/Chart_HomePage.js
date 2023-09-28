import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MultitypeChart from './MultitypeChart';



{/* Multitype Chart - income expensive split and balance line withe pop up detail box on hover */ }
function Chart_HomePage({ fullList, moneySymbol }) {

  /* arr of month names (index = month num) */
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* returns the last 4 months (in numbers) */
  const getLast4Months = () => {
    const today = new Date();
    const month = today.getMonth();
    return [month - 3, month - 2, month - 1, month]; // last 4 months
  }

  const last4Months = getLast4Months(); // last 4 months arr in numbers
  const labels = last4Months.map((month) => { return monthNames[month]; }); // last 4 months in names


  // returns the chart data -> arr of all the sums income / expenses in the last 4 months
  const getData = (type) => {
    const data = [];
    last4Months.forEach((month) => {
      const monthNumber = (month + 12) % 12 + 1; // Convert month number to 1-12 format
      data.push(getSum(monthNumber, type));
    });
    return data;
  };

  // returns the sum of all income / expenses (type) from monthNumber
  const getSum = (monthNumber, type) => {
    const currentDate = new Date();
    let sum = 0;

    fullList.forEach((item) => {
      if (item.selectedOption === type && item.date.year === currentDate.getFullYear() && item.date.month === monthNumber)
        sum += parseFloat(type == "income" ? item.amount : -item.amount);
    });

    return sum;
  }

  // returns an arr of the balance in the last 4 months
  const getBalance = (incomeD, expensesD) => {
    return last4Months.map((month, index) => {
      return incomeD[index] + expensesD[index];
    });
  };



  const incomeData = getData("income");
  const expensesData = getData("expense");
  const balanceData = getBalance(incomeData, expensesData);

  /* data to the chart */
  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'balance',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 2,
        fill: false,
        data: balanceData,
      },
      {
        type: 'bar',
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgb(25, 135, 84)',
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Expenses',
        data: expensesData,
        backgroundColor: 'rgb(220, 53, 69)',
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  /* options - font sizes */
  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 18, // Font size for the x-axis (months) labels
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 18, // Font size for the y-axis (amounts) labels
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 22, // Label font size for the legend
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
          title: (context) => {
            const index = context[0].dataIndex; // Get the index of the data point being hovered
            return labels[index]; // Return the month name as the title
          },
          label: (context) => {
            const datasetLabel = context.dataset.label; // Get the dataset label (e.g., Income, Expenses, etc.)
            const dataValue = context.parsed.y; // Get the data value
            const amount = dataValue.toFixed(1); // Format amount with two decimal places
            return ` ${datasetLabel}: ${amount + moneySymbol}`; // Return the dataset label and formatted value as the tooltip label
          },
        },
      },
    },
  };

  /* mobile options - font sizes */
  const optionsMobile = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 15, // Font size for the x-axis (months) labels
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 15, // Font size for the y-axis (amounts) labels
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 22, // Label font size for the legend
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
          title: (context) => {
            const index = context[0].dataIndex; // Get the index of the data point being hovered
            return labels[index]; // Return the month name as the title
          },
          label: (context) => {
            const datasetLabel = context.dataset.label; // Get the dataset label (e.g., Income, Expenses, etc.)
            const dataValue = context.parsed.y; // Get the data value
            const amount = dataValue.toFixed(1); // Format amount with two decimal places
            return ` ${datasetLabel}: ${amount + moneySymbol}`; // Return the dataset label and formatted value as the tooltip label
          },
        },
      },
    },
  };


  return (
    <div className='mt-5'>
      <div className='col-10 border-bottom border-2 fs-4 mb-3'>4 Months Summery</div>
      <MultitypeChart data={data} height={window.innerWidth >= 768 ? null : "400"} options={window.innerWidth >= 768 ? options : optionsMobile} />
    </div>
  );

}

export default Chart_HomePage