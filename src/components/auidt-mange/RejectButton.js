import React, { useState } from 'react';
import { Button, Popconfirm, Form, Input } from 'antd';

const RejectButton = ({ record, onReject }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleConfirm = () => {
    form.validateFields().then(values => {
      // 处理表单提交逻辑
      console.log(values);
      // 隐藏 Popconfirm
      setVisible(false);
      // 执行驳回操作
      onReject(record.id, values.reason);
    }).catch(errorInfo => {
      // 处理表单验证失败逻辑
      console.log('Validation failed:', errorInfo);
    });
  };

  return (
    <Popconfirm
      title="驳回原因"
      open={visible}
      onOpenChange={setVisible}
      okText="确认"
      cancelText="取消"
      onCancel={() => setVisible(false)}
      onConfirm={handleConfirm}
      okButtonProps={{ form: 'rejectForm', key: 'submit', htmlType: 'submit' }}
    >
      <Form
        form={form}
        name="rejectForm"
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Form.Item
          label="驳回原因"
          name="reason"
          rules={[{ required: true, message: '请输入驳回原因' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
      <Button type="link" onClick={() => setVisible(true)}>驳回</Button>
    </Popconfirm>
  );
};
export default RejectButton