import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, notification } from 'antd';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './NewsAdd.css';
import formatDate from '../../../utils/renderTime';
import NewsDrawer from '../../../components/news-manage/NewsDrawer';
import NewsDrawerUpdate from '../../../components/news-manage/NewsDrawerUpdate';
const { confirm } = Modal;
function NewsBin() {
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
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => showDrawer(record, 'left')}
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
      title: '创建时间',
      dataIndex: 'creareTime',
      key: 'creareTime',
      render: (text) => {
        return <span>{formatDate(text)}</span>;
      }
    },
    {
      title: '状态',
      dataIndex: 'auditState',
      key: 'auditState',
      render: () => {
        return <Tag color='blue'>待审核</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={() => showDrawer(record, 'right')}>
            编辑
          </Button>
          <Button size="small" type="primary" danger onClick={() => showConfirm(record)}>
            删除
          </Button>
          <Button size="small" onClick={() => pushAudit(record)}>
            提交审核
          </Button>
        </Space>
      )
    }
  ];

  // 列表数据
  const [dataSource, setDataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    const res = await axios.get(`/news?author=${username}&auditState=0&_expand=category`);
    setDataSource(res.data);
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

  /**
   * 提交审核
   * @param {*} record 表格行数据
   */
  const pushAudit = (record) => {
    confirm({
      title: '确认提交审核吗？',
      icon: <ExclamationCircleFilled />,
      onOk() {
        auditMethod(record);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };
  const auditMethod = async (record) => {
    await axios.patch(`/news/${record.id}`, {
      auditState: 1
    });
    notification.info({
      message: `操作完成`,
      description: `您已提交审核，可以前往审核列表中查看。`,
      placement: 'bottomRight'
    });
    getList();
  };

  const [recordInfo, setrecordInfo] = useState({});

  /**
   * 打开抽屉
   * @param {*} record 表格行数据
   */
  const showDrawer = (record, option) => {
    setrecordInfo(record);
    if (option === 'left') {
      setOpen(true);
    } else {
      setOpenUpdate(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseUpdate = () => {
    setOpenUpdate(false);
    getList()
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          navigate('/news-manage/news/add');
        }}
      >
        撰写新闻
      </Button>
      <div style={{ height: '20px' }}></div>
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
      <NewsDrawer recordInfo={recordInfo} open={open} onClose={onClose} />
      <NewsDrawerUpdate recordInfo={recordInfo} open={openUpdate} onClose={onCloseUpdate} />
    </div>
  );
}

export default NewsBin;
