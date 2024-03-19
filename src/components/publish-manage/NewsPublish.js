import React, { useEffect, useState } from 'react';
import { Table, Space, Tag } from 'antd';

import NewsDrawer from '../news-manage/NewsDrawer';

function NewsPublish({ dataSource, button }) {
  // 表格列数据
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        return <b>{text}</b>
      }
    },
    {
      title: '帖子名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        return (
          <span
            onClick={() => showDrawer(record)}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            {text}
          </span>
        );
      }
    },
    {
      title: '帖子分类',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => {
        return <span>{record.category?.title}</span>;
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      key: 'auditState',
      render: (text) => {
        return <Tag color={colorList[text]}>{auditList[text]}</Tag>;
      }
    },
    {
      title: '发布状态',
      dataIndex: 'publishState',
      key: 'publishState',
      render: (text) => {
        return <Tag color={colorListPub[text]}>{publinshList[text]}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => <Space size="middle">{button(record.id)}</Space>
    }
  ];
  
  // 列表数据
  const [data, setData] = useState([]);
  const [recordInfo, setrecordInfo] = useState({});
  const [open, setOpen] = useState(false);
  const auditList = ['待审核', '审核中', '已通过', '已驳回'];
  const publinshList = ['未发布', '待发布', '已上线', '已下线'];
  const colorList = ['blue', 'green', 'lime', 'red'];
  const colorListPub = ['', 'blue', 'orange', 'red'];

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  /**
   * 打开抽屉
   * @param {*} record 表格行数据
   */
  const showDrawer = (record) => {
    setrecordInfo(record);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />
      <NewsDrawer recordInfo={recordInfo} open={open} onClose={onClose} />
    </div>
  );
}

export default NewsPublish;
