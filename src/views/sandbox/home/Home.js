import React from 'react';
import EChart from '../../../components/Echarts';
function Home() {
  const option1 = {
    title: {
      text: '用户满意度调查',
      subtext: '不完全统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '没有感觉' },
          { value: 735, name: '说得过去' },
          { value: 580, name: '比较满意' },
          { value: 484, name: '非常满意' },
          { value: 300, name: '不喜欢' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  const option2 = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', '2021', '2022', '2023'],
        ['提供建议', 83.1, 73.4, 55.1],
        ['建议反馈', 43.3, 85.8, 93.7],
        ['计划落实', 72.4, 53.9, 39.1],
        ['需求改进', 86.4, 65.2, 82.5]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  };
  const option3 = {
    title: {
      text: '文章统计情况'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['创建的文章', '草稿箱中的文章', '审核通过的文章', '下线的文章', '驳回的文章']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '草稿箱中的文章',
        type: 'line',
        stack: 'Total',
        data: [100, 120, 200, 300, 350, 260, 370]
      },
      {
        name: '驳回的文章',
        type: 'line',
        stack: 'Total',
        data: [400, 500, 600, 610, 660, 700, 810]
      },
      {
        name: '下线的文章',
        type: 'line',
        stack: 'Total',
        data: [300, 350, 400, 460, 500, 600, 610]
      },

      {
        name: '审核通过的文章',
        type: 'line',
        stack: 'Total',
        data: [500, 670, 700, 720, 860, 940, 1100]
      },

      {
        name: '创建的文章',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  const widthTop = '50%';
  const heightTop = '30vh';
  const widthBot = '100%';
  const heightBot = '40vh';
  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <EChart option={option1} width={widthTop} height={heightTop} />
        <EChart option={option2} width={widthTop} height={heightTop} />
      </div>
      <EChart option={option3} width={widthBot} height={heightBot} />
    </div>
  );
}

export default Home;
