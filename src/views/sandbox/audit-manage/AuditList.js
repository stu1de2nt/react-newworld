import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, notification } from 'antd';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import NewsDrawer from '../../../components/news-manage/NewsDrawer';
const { confirm } = Modal;

function AuditList() {
  // 表格列数据
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        return <b>{text}</b>;
      }
    },
    {
      title: '新闻名称',
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
      title: '新闻分类',
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
      title: '状态',
      dataIndex: 'auditState',
      key: 'auditState',
      render: (text) => {
        return (
          <Tag
            color={
              text === 0 ? 'blue' : text === 1 ? 'green' : text === 2 ? 'lime' : 'red'
            }
          >
            {text === 0
              ? '待审核'
              : text === 1
              ? '审核中'
              : text === 2
              ? '已通过'
              : '已驳回'}
          </Tag>
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={() => renderAudit(record)}>
            撤销审核
          </Button>
          <Button size="small" type="primary" danger onClick={() => showConfirm(record)}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  // 列表数据
  const [dataSource, setDataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    const res = await axios.get(
      `/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`
    );
    setDataSource(res.data);
  };

  /**
   * 撤销确认
   * @param {*} record 表格行数据
   */
  const renderAudit = (record) => {
    confirm({
      title: '确认撤销吗？',
      content: '撤销后你可以在草稿箱中查看。',
      icon: <ExclamationCircleFilled />,
      onOk() {
        auditMethod(record);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  /**
   * 撤销请求
   * @param {*} record 表格行数据
   */
  const auditMethod = async (record) => {
    await axios.patch(`/news/${record.id}`, {
      auditState: 0
    });
    notification.info({
      message: `操作完成`,
      description: `您已撤销审核，可以前往草稿箱中查看。`,
      placement: 'bottomRight'
    });
    getList();
  };

  /**
   * 删除确认
   * @param {*} record 表格行数据
   */
  const showConfirm = (record) => {
    confirm({
      title: '确认删除吗？',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteMethod(record);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  /**
   * 删除请求
   * @param {*} record 表格行数据
   */
  const deleteMethod = async (record) => {
    await axios.delete(`/news/${record.id}`);
    getList();
  };

  const [recordInfo, setrecordInfo] = useState({});
  const [open, setOpen] = useState(false);
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
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
      <NewsDrawer recordInfo={recordInfo} open={open} onClose={onClose} />
    </div>
  );
}

export default AuditList;
