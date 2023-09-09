import React from 'react';
import {Chart as ChartJS, LinearScale,CategoryScale,BarElement,PointElement,LineElement,Legend, Tooltip, LineController, BarController,} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register( LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);

function MultitypeChart({data, options, width, height}) {
    return <Chart type='bar'data={data} width={width? width:null} height={height? height:null} options={options? options:null} />;

}

export default MultitypeChart