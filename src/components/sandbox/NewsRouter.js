import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../views/sandbox/home/Home';
import UserList from '../../views/sandbox/user-manage/UserList';
import RoleList from '../../views/sandbox/role-manage/RoleList';
import RightList from '../../views/sandbox/right-manage/RightList';
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd';
import NewsBin from '../../views/sandbox/news-manage/NewsBin';
import NewsType from '../../views/sandbox/news-manage/NewsType';
import NewsAudit from '../../views/sandbox/audit-manage/NewsAudit';
import AuditList from '../../views/sandbox/audit-manage/AuditList';
import NewsWait from '../../views/sandbox/publish-manage/NewsWait';
import NewsFinish from '../../views/sandbox/publish-manage/NewsFinish';
import NewsLine from '../../views/sandbox/publish-manage/NewsLine';
import axios from 'axios';
import { useState } from 'react';
import NoPermission from '../../views/nopermission/NoPermission';

const localRouterMap = {
  '/home': <Home />,
  '/user-manage/list': <UserList />,
  '/right-manage/role/list': <RoleList />,
  '/right-manage/right/list': <RightList />,
  '/news-manage/news/add': <NewsAdd />,
  '/news-manage/news/bin': <NewsBin />,
  '/news-manage/news/type': <NewsType />,
  '/audit-manage/news/audit': <NewsAudit />,
  '/audit-manage/news/list': <AuditList />,
  '/publish-manage/news/wait': <NewsWait />,
  '/publish-manage/news/finish': <NewsFinish />,
  '/publish-manage/news/line': <NewsLine />
};
function NewsRouter() {
  const [bankList, setBankList] = useState([]);
  
  const {
    role: { rights }
  } = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    Promise.all([axios.get('/rights'), axios.get('/children')]).then((res) => {
      setBankList([...res[0].data, ...res[1].data]);
    });
  }, []);

  /**
   * 判断是否展示或存在当前路径
   * @param {*} item 路由表数据
   * @returns Boolean 是否可展示当前路径
   */
  const checkRoute = (item) => {
    return localRouterMap[item.key] && item.pagepermisson;
  };

  /**
   * 判断用户是否有权限查看当前路径
   * @param {*} item 路由表数据
   * @returns Boolean 当前用户是否有权限查看
   */
  const checkUserPermission = (item) => {
    return rights.includes(item.key);
  };
  return (
    <div>
      <Routes>
        {bankList.map((item) => {
          if (checkRoute(item) && checkUserPermission(item)) {
            return (
              <Route key={item.key} path={item.key} element={localRouterMap[item.key]} />
            );
          } else {
            return null;
          }
        })}
        <Route path="/" element={<Navigate to={'home'} />} />
        <Route path="*" element={<NoPermission />} />
      </Routes>
    </div>
  );
}

export default NewsRouter;
