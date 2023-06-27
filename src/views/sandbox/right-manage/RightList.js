import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Modal, Switch } from 'antd';
import axios from 'axios';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

function RightList() {
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
      title: '权限名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (text) => {
        return <Tag color="orange">{text}</Tag>;
      }
    },
    {
      title: '配置项',
      dataIndex: 'pagepermisson',
      key: 'pagepermisson',
      render: (text, record) => {
        return (
          <Switch
            onClick={() => changeSwitch(record)}
            checked={text === 1}
            disabled={text === undefined}
          />
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            icon={<DeleteOutlined />}
            type="primary"
            onClick={() => showConfirm(record)}
            danger
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  // 列表数据
  const [data, setData] = useState([]);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 请求列表
   */
  const getList = async () => {
    const res = await axios.get('/rights?_embed=children');
    const list = recursionData(res.data);
    setData(list);
  };

  /**
   * 递归清除
   * @param {*} item 需要递归的数组
   * @returns 递归完成后的数据
   */
  const recursionData = (item) => {
    item.forEach((i) => {
      if (i.children?.length) {
        recursionData(i.children);
      } else {
        i.children = null;
      }
    });
    return item;
  };

  /**
   * 删除确认
   * @param {*} record table行数
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
   * @param {*} record table行数据
   */
  const deleteMethod = async (record) => {
    if (record.grade === 1) {
      await axios.delete(`/rights/${record.id}`);
    } else {
      await axios.delete(`/children/${record.id}`);
    }
    getList();
  };

  /**
   * 修改switch状态
   * @param {*} record table行数据
   */
  const changeSwitch = async (record) => {
    if (record.grade === 1) {
      await axios.patch(`/rights/${record.id}`, {
        pagepermisson: record.pagepermisson ? 0 : 1
      });
    } else {
      await axios.patch(`/children/${record.id}`, {
        pagepermisson: record.pagepermisson ? 0 : 1
      });
    }
    getList();
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default RightList;
