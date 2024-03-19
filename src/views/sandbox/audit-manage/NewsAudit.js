import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, notification } from 'antd';
import axios from 'axios';
import NewsDrawer from '../../../components/news-manage/NewsDrawer';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';

const { confirm } = Modal;

function NewsAudit() {
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
      title: '帖子区域',
      dataIndex: 'region',
      key: 'region'
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
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<CheckCircleOutlined />}
            size="small"
            type="primary"
            onClick={() => showConfirm(record, 2, 1)}
          >
            通过
          </Button>
          <Button
            icon={<CloseCircleOutlined />}
            size="small"
            danger
            type="primary"
            onClick={() => showConfirm(record, 3, 0)}
          >
            驳回
          </Button>
        </Space>
      )
    }
  ];
  // 列表数据
  const [dataSource, setDataSource] = useState([]);
  const [recordInfo, setrecordInfo] = useState({});
  const [open, setOpen] = useState(false);

  const auditList = ['待审核', '审核中', '已通过', '已驳回'];
  const colorList = ['blue', 'green', 'lime', 'red'];

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await axios.get(`/news?auditState=1&_expand=category`);
    setDataSource(res.data);
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
   * 点击通过 / 驳回
   * @param {*} record 表格行数据
   * @param {*} auditState 审核状态
   * @param {*} publishState 发布状态
   */
  const showConfirm = (record, auditState, publishState) => {
    confirm({
      title: `确认${auditState === 2 ? '通过' : '驳回'}吗？`,
      icon: <ExclamationCircleFilled />,
      onOk() {
        auditMethod(record, auditState, publishState);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  /**
   * 通过请求
   * @param {*} record 表格行数据
   */
  const auditMethod = async (record, auditState, publishState) => {
    await axios.patch(`/news/${record.id}`, {
      auditState,
      publishState
    });
    notification.info({
      message: `操作完成`,
      description: `您已将帖子${auditState === 2 ? '通过审核': '驳回'}`,
      placement: 'bottomRight'
    });
    getList();
  };
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
      <NewsDrawer recordInfo={recordInfo} open={open} onClose={onClose} />
    </div>
  );
}

export default NewsAudit;
