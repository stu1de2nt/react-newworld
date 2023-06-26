import React, { useState } from 'react';
import Layout from 'antd/es/layout/layout';
import { Dropdown, Space, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

function TopHeader() {
  const navigate = useNavigate();
  // 展开关闭
  const [collapsed, setCollapsed] = useState(false);
  // 用户信息
  const {
    username,
    role: { roleName }
  } = JSON.parse(localStorage.getItem('token') || {});

  const items = [
    {
      key: '1',
      label: `${roleName}`
    },
    {
      key: '2',
      danger: true,
      label: <div onClick={logout}>退出登录</div>
    }
  ];

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  function handleChange() {
    setCollapsed(!collapsed);
  }
  return (
    <Header
      style={{
        padding: '0 16px',
        background: '#fff'
      }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={handleChange} />
      ) : (
        <MenuFoldOutlined onClick={handleChange} />
      )}
      <div style={{ float: 'right' }}>
        <span style={{ marginRight: '5px' }}>
          欢迎回来 <span style={{ color: 'blue' }}>{username}</span>
        </span>

        <Dropdown
          menu={{
            items
          }}
        >
          <Space>
            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}

export default TopHeader;
