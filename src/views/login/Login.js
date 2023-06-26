import React from 'react';
import { Button, Form, Input, message } from 'antd';
import Particles from 'react-particles-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Index() {
  const navigate = useNavigate();
  /**
   * 表单验证通过
   * @param {*} values 表单提交的值
   */
  const onFinish = async (values) => {
    const res = await axios.get(
      `/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
    );
    if (res.data.length) {
      localStorage.setItem('token',JSON.stringify(res.data[0]));
      navigate('/');
    } else {
      message.error("用户名或密码不匹配！")
    }
  };

  /**
   * 表单验证失败
   * @param {*} errorInfo 验证失败的信息
   */
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        background: 'rgb(35,39,65)',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <Particles height={document.documentElement.clientHeight} />
      <Form
        style={{
          background: 'rgba(0,0,0,0.5)',
          width: '500px',
          padding: '24px 24px 12px 24px',
          borderRadius: '8px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          style={{
            textAlign: 'center',
            color: '#fff'
          }}
        >
          <div style={{ fontSize: '30px', fontWeight: 600 }}>
            <img
              src="/母鸡.svg"
              style={{ width: '40px', height: '40px', marginRight: '10px' }}
              alt="鸡"
            />
            用户登录
            <img
              src="/篮球.svg"
              style={{ width: '40px', height: '40px', marginLeft: '10px' }}
              alt="篮球"
            />
          </div>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!'
            }
          ]}
        >
          <Input placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!'
            }
          ]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            style={{ height: '40px', fontSize: '18px' }}
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
