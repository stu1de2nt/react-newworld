import React, { useEffect } from 'react';
import SidMenu from '../../components/sandbox/SidMenu';
import TopHeader from '../../components/sandbox/TopHeader';
import { Navigate } from 'react-router-dom';
import './NewSandBox.css';
import { Layout } from 'antd';
import NewsRouter from '../../components/sandbox/NewsRouter';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const { Content } = Layout;

export default function NewsSandBox() {
  NProgress.start();
  useEffect(() => {
    NProgress.done();
  });
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout>
      <SidMenu></SidMenu>
      <Layout>
        <TopHeader></TopHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
            overflow: 'auto'
          }}
        >
          <NewsRouter />
        </Content>
      </Layout>
    </Layout>
  );
}

