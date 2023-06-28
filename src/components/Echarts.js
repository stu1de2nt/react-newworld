import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const EChart = ({ option, width, height }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);
  }, [option]);

  return (
    <div ref={chartRef} style={{ width: width || '100%', height: height || '80vh' }} />
  );
};

export default EChart;
