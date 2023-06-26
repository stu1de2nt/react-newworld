import { Table, Button, Space, Modal, Tree } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

function RoleList() {
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
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={() => showModel(record)}>
            编辑
          </Button>
          <Button size="small" type="primary" onClick={() => showConfirm(record)} danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  // 列表数据
  const [dataSource, setDataSource] = useState([]);

  // 选中数据id
  const [id, setId] = useState(null);

  // 初始化请求
  useEffect(() => {
    getList();
    getTreeData();
  }, []);

  /**
   * 请求列表数据
   */
  const getList = async () => {
    const res = await axios.get('/roles');
    setDataSource(res.data);
  };

  /**
   * 删除确认
   * @param {*} record table行数据 
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
    await axios.delete(`/roles/${record.id}`);
    getList();
  };

  // model标识符
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * 编辑model打开
   * @param {*} record table行数据
   */
  const showModel = async (record) => {
    setIsModalOpen(true);
    const res = await axios.get(`/roles/${record.id}`);
    setId(res.data.id);
    setTreeSelectData(res.data.rights);
  };

  /**
   * 确认修改
   */
  const handleOk = async () => {
    await axios.patch(`/roles/${id}`, {
      rights: treeSelectData
    });
    handleCancel();
  };

  /**
   * 取消修改
   */
  const handleCancel = () => {
    setIsModalOpen(false);
    setId(null);
    setTreeSelectData([])
    getList();
  };

  // 树形数据
  const [treeData, setTreeData] = useState([]);

  // 树形选中状态
  const [treeSelectData, setTreeSelectData] = useState([]);

  /**
   * 获取树形结构数据
   */
  const getTreeData = async () => {
    const res = await axios.get('/rights?_embed=children');
    setTreeData(res.data);
  };

  /**
   * 选择树形数据
   * @param {*} checkedKeys 选中的key[]
   */
  const onCheck = (checkedKeys) => {
    setTreeSelectData(checkedKeys);
  };
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
      <Modal
        title="编辑权限"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <Tree
          checkable
          defaultExpandedKeys={treeSelectData}
          checkedKeys={treeSelectData}
          onCheck={onCheck}
          treeData={treeData}
          checkStrictly={true}
        />
      </Modal>
    </div>
  );
}

export default RoleList;
