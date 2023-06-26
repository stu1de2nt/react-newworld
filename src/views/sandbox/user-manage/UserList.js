import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Switch, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

function UserList() {
  // 表格列数据
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      render: (text) => {
        return <b>{text}</b>;
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (text, record) => {
        return <span>{record.role?.roleName || text}</span>;
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      key: 'roleState',
      render: (text, record) => {
        return (
          <Switch
            onClick={() => changeSwitch(record)}
            checked={text}
            disabled={record.default}
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
            disabled={record.default}
            onClick={() => editUser(record)}
            type="primary"
          >
            编辑
          </Button>
          <Button
            size="small"
            disabled={record.default}
            onClick={() => showConfirm(record)}
            type="primary"
            danger
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  // 列表数据
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getOptions();
    getList();
  }, []);

  /**
   * 请求列表数据
   */
  const getList = async () => {
    const res = await axios.get('/users?_expand=role');
    setDataSource(res.data);
  };

  /**
   * 修改switch状态
   * @param {*} record table行数据
   */
  const changeSwitch = async (record) => {
    await axios.patch(`/users/${record.id}`, {
      roleState: !record.roleState
    });
    getList();
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
    await axios.delete(`/users/${record.id}`);
    getList();
  };

  // model开关
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 选中当前数据id
  const [id, setId] = useState(null);

  /**
   * 添加用户
   */
  const changeAdd = () => {
    setIsModalOpen(true);
  };

  /**
   * 编辑用户
   * @param {*} record table行数据
   */
  const editUser = async (record) => {
    setIsModalOpen(true);
    const res = await axios.get(`/users/${record.id}`);
    setId(res.data.id);
    form.setFieldsValue(res.data);
  };

  /**
   * model提交
   */
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (id) {
          formPut(values);
        } else {
          fromAdd(values);
        }
        handleCancel();
      })
      .catch((error) => {
        console.error('表单验证失败:', error);
      });
  };

  /**
   * model关闭
   */
  const handleCancel = () => {
    setIsModalOpen(false);
    setId(null);
    form.resetFields();
  };

  // 表单数据
  const [form] = Form.useForm();

  /**
   * 表单swicth修改
   * @param {*} checked swicth开关状态
   */
  const handleSwitchChange = (checked) => {
    form.setFieldsValue({ roleState: checked }); // 更新表单项的值
  };

  /**
   * 表单新增请求
   * @param {*} values form表单数据
   */
  const fromAdd = async (values) => {
    await axios.post(`/users`, {
      ...values
    });
    getList();
  };

  /**
   * 表单修改请求
   * @param {*} values form表单数据
   */
  const formPut = async (values) => {
    await axios.patch(`/users/${id}`, {
      ...values
    });
    getList();
  };

  const [optionsList, setOptionsList] = useState([]);

  const getOptions = async () => {
    const res = await axios.get(`/roles`);
    setOptionsList(res.data);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Button onClick={changeAdd} type="primary">
        添加用户
      </Button>
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
      <Modal
        title={id ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="区域"
            name="region"
            rules={[{ required: true, message: '请选择输入区域' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色名称"
            name="roleId"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select
              style={{
                width: 120
              }}
              onChange={handleChange}
              options={(optionsList || []).map((d) => ({
                value: d.id,
                label: d.roleName
              }))}
              key="id"
              label="roleName"
            />
          </Form.Item>
          <Form.Item label="用户状态" name="roleState" valuePropName="checked">
            <Switch onChange={handleSwitchChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserList;
