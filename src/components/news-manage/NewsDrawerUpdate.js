import React, { useEffect, useState } from 'react';
import { Drawer, Form, Select, Input, Space, Button, notification } from 'antd';
import axios from 'axios';
import NewsEditor from './NewsEditor';
const NewsDrawerUpdate = ({ recordInfo, open, onClose }) => {
  const [form] = Form.useForm();
  const [optionsList, setOptionsList] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    getOptions();
    form.setFieldsValue({ title: recordInfo.title, categoryId: recordInfo.categoryId });
    setContent(recordInfo.content);
  }, [form, recordInfo]);

  /**
   * 表单验证
   * @param {*} action 保存状态 0 待审核 1 审核中 2 已通过 3 已驳回
   */
  const handleSave = (action) => {
    form
      .validateFields()
      .then((values) => {
        saveClose(action, values);
      })
      .catch((error) => {
        console.error('表单验证失败:', error);
      });
  };

  /**
   * 提交草稿箱 / 审核
   * @param {*} action 保存状态 0 待审核 1 审核中 2 已通过 3 已驳回
   * @param {*} values 表单数据
   */
  const saveClose = async (action, values) => {
    await axios.patch(`/news/${recordInfo.id}`, {
      ...values,
      content: content,
      auditState: action,
    });
    notification.info({
      message: `操作完成`,
      description: `您可以到${action === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
      placement: 'bottomRight'
    });
    onClose()
  };

  /**
   * 获取新闻分类数据
   */
  const getOptions = async () => {
    const res = await axios.get('/categories');
    setOptionsList(res.data);
  };

  return (
    <Drawer
      title="更新新闻"
      placement="right"
      onClose={onClose}
      open={open}
      // maskClosable={false}
      size="large"
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={() => handleSave(0)}>
            保存至草稿箱
          </Button>
          <Button type="primary" danger onClick={() => handleSave(1)}>
            提交审核
          </Button>
        </Space>
      }
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item
          label="新闻标题"
          name="title"
          rules={[{ required: true, message: '请输入新闻标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="新闻分类"
          name="categoryId"
          rules={[{ required: true, message: '请选择新闻分类' }]}
        >
          <Select
            options={(optionsList || []).map((d) => ({
              value: d.id,
              label: d.title
            }))}
            key="id"
            label="title"
          />
        </Form.Item>
      </Form>
      <NewsEditor
        content={content}
        onValueChange={(values) => {
          setContent(values);
        }}
      />
    </Drawer>
  );
};

export default NewsDrawerUpdate;
