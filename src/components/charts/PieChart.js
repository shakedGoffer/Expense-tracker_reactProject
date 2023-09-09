import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({data, options, width,height}) {
    return (
        <div>
            <Pie data={data} width={width? width:null} height={height? height:null} options={options? options:null} />
        </div>
    );
}




export default PieChart