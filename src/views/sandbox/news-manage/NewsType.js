import React, { useContext, useEffect, useRef, useState } from 'react';
import { Table, Button, Space, Modal, notification, message, Form, Input } from 'antd';
import axios from 'axios';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;
const EditableContext = React.createContext(null);
function NewsType() {
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
      title: '栏目名称',
      dataIndex: 'title',
      key: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave
      })
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            type="primary"
            onClick={() => showConfirm(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  // 输入框保存时
  const handleSave = async (record) => {
    await axios.patch(`/categories/${record.id}`, {
      title: record.title,
      value: record.value
    });
    getList();
  };

  // 列表数据
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  // 请求列表
  const getList = async () => {
    const res = await axios.get('/categories');
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
   * @param {*} record table行数据
   */
  const deleteMethod = async (record) => {
    message.error('抱歉当前数据为系统配置，无法删除');
    notification.error({
      message: `操作失败`,
      description: `抱歉您当前操作的数据只允许修改，无法对其删除，如果需要删除请联系开发人员协调处理。`,
      placement: 'bottomRight'
    });

    // 开发人员操作-打开后可删除
    /*
      await axios.delete(`/categories/${record.id}`);
      getList();
    */
  };

  // 可编辑行
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  // 可编辑列
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values
        });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };

  return (
    <div>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
      />
    </div>
  );
}

export default NewsType;
