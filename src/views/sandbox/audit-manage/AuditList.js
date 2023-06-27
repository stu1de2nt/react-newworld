import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, notification } from 'antd';
import axios from 'axios';
import {
  ExclamationCircleFilled,
  CheckCircleOutlined,
  SyncOutlined,
  RotateLeftOutlined
} from '@ant-design/icons';
import NewsDrawer from '../../../components/news-manage/NewsDrawer';
import NewsDrawerUpdate from '../../../components/news-manage/NewsDrawerUpdate';
import { useNavigate } from 'react-router-dom';

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
      render: (_, record) => (
        <Space size="middle">
          {record.auditState === 1 && (
            <Button
              size="small"
              icon={<RotateLeftOutlined />}
              type="primary"
              onClick={() => renderAudit(record)}
            >
              撤销审核
            </Button>
          )}
          {record.auditState === 2 && (
            <Button
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => publishConfirm(record)}
            >
              发布
            </Button>
          )}
          {record.auditState === 3 && (
            <Button
              size="small"
              icon={<SyncOutlined />}
              type="primary"
              danger
              onClick={() => renderEdit(record)}
            >
              重新编辑
            </Button>
          )}
        </Space>
      )
    }
  ];

  // 列表数据
  const [dataSource, setDataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem('token'));
  const [recordInfo, setrecordInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const navigate = useNavigate();

  const auditList = ['待审核', '审核中', '已通过', '已驳回'];
  const publinshList = ['未发布', '待发布', '已上线', '已下线'];
  const colorList = ['blue', 'green', 'lime', 'red'];
  const colorListPub = ['', 'blue', 'orange', 'red'];

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
      content: '撤销后您可以在草稿箱中查看。',
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

  /**
   * 点击重新编辑
   * @param {*} record 表格行数据
   */
  const renderEdit = (record) => {
    setrecordInfo(record);
    setOpenUpdate(true);
  };

  const onCloseUpdate = () => {
    setOpenUpdate(false);
    getList();
  };

  /**
   * 点击发布
   * @param {*} record 表格行数据
   */
  const publishConfirm = (record) => {
    confirm({
      title: '确认发布吗？',
      content: '发布后您可以在发布管理中查看。',
      icon: <ExclamationCircleFilled />,
      onOk() {
        publishMethod(record);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  /**
   * 发布请求
   * @param {*} record 表格行数据
   */
  const publishMethod = async (record) => {
    await axios.patch(`/news/${record.id}`, {
      publishState: 2,
      publishTime: Date.now()
    });
    notification.info({
      message: `操作完成`,
      description: `新闻发布成功，可以在发布管理中查看。`,
      placement: 'bottomRight'
    });
    navigate('/publish-manage/news/finish');
  };
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
      <NewsDrawer recordInfo={recordInfo} open={open} onClose={onClose} />
      <NewsDrawerUpdate
        recordInfo={recordInfo}
        open={openUpdate}
        onClose={onCloseUpdate}
      />
    </div>
  );
}

export default AuditList;
