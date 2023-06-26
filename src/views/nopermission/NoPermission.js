import React from 'react';
import { Link } from 'react-router-dom';

function NoPermission() {
  return (
    <div>
      <h1>404 / 403 - Not Found</h1>
      <p>抱歉未找到当前页面 / 您没有权限查看当前页面.</p>
      <Link to="/">Go back to home(返回首页)</Link>
    </div>
  );
}

export default NoPermission;
