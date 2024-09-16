<template>
    <div>
      <pie-chart :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
  export default {
    components: {
      PieChart: Pie
    },
    props: {
      score: Number,
      maxScore: Number
    },
    computed: {
      chartData() {
        return {
          labels: ['Your Score', 'Remaining'],
          datasets: [
            {
              data: [this.score, this.maxScore - this.score],
              backgroundColor: ['#42A5F5', '#E0E0E0']
            }
          ]
        };
      },
      chartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const { dataIndex } = tooltipItem;
                  return [`${dataIndex === 0 ? 'Your Score' : 'Remaining'}: ${tooltipItem.raw}`];
                }
              }
            }
          }
        };
      }
    }
  };
  </script>
  