import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined,
  GlobalOutlined,
  CalendarOutlined,
  CheckSquareOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const { Sider } = Layout;
const { SubMenu } = Menu;

const iconList = {
  '/home': <HomeOutlined />,
  '/user-manage': <UsergroupDeleteOutlined />,
  '/right-manage': <SettingOutlined />,
  '/news-manage': <GlobalOutlined />,
  '/audit-manage': <CalendarOutlined />,
  '/publish-manage': <CheckSquareOutlined />
};

function SidMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const selectKeys = [location.pathname];
  const openKeys = ['/' + location.pathname.split('/')[1]];

  // 点击memu页面跳转
  function changeRouter(item) {
    navigate(item.key);
  }

  // 请求menu数据
  useEffect(() => {
    axios.get('/rights?_embed=children').then((res) => {
      setMenu(res.data);
    });
  }, []);

  const {
    role: { rights }
  } = JSON.parse(localStorage.getItem('token') || {});
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div
        style={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column'
        }}
      >
        <div className="logo">全球技术论坛</div>
        <Menu
          onClick={changeRouter}
          style={{ flex: 1, overflow: 'auto' }}
          theme="dark"
          mode="inline"
          selectedKeys={selectKeys}
          defaultOpenKeys={openKeys}
        >
          {menu.map((item) => {
            if (item.children.length && rights.includes(item.key)) {
              return (
                <SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
                  {item.children.map((ele) => {
                    if (ele.pagepermisson && rights.includes(ele.key)) {
                      return <Menu.Item key={ele.key}>{ele.title}</Menu.Item>;
                    } else {
                      return null;
                    }
                  })}
                </SubMenu>
              );
            } else if (item.children.length) {
              return null;
            } else {
              return (
                <Menu.Item key={item.key} icon={iconList[item.key]}>
                  {item.title}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </div>
    </Sider>
  );
}

export default SidMenu;
