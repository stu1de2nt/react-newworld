import React from 'react';
import EChart from '../../../components/Echarts';
function Home() {
  const option = {
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: [
        ['product', '2018', '2019', '2020', '2021', '2022', '2023'],
        ['发布新闻', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ['通过审核', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ['新增用户', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
        ['驳回新闻', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2018} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '2018',
          tooltip: '2018'
        }
      }
    ]
  };
  return (
    <div>
      <EChart option={option} />
    </div>
  );
}

export default Home;
