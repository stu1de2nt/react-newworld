import React, { useEffect, useState } from 'react';
import { Typography, Steps, Button, Form, Input, Select, notification } from 'antd';
import './NewsAdd.css';
import NewsEditor from '../../../components/news-manage/NewsEditor';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
function NewsAdd() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [optionsList, setOptionsList] = useState([]);
  const [formInfo, setFormInfo] = useState({});
  const [contentInfo, setContentInfo] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();

  /**
   * 点击上一步
   */
  const handlePrevious = () => {
    setCurrent(current - 1);
  };

  /**
   * 点击下一步
   */
  const handleNext = () => {
    if (current === 0) {
      form
        .validateFields()
        .then((values) => {
          setFormInfo(values);
          setCurrent(current + 1);
        })
        .catch((error) => {
          console.error('表单验证失败:', error);
        });
    } else {
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  /**
   * 获取新闻分类数据
   */
  const getOptions = async () => {
    const res = await axios.get('/categories');
    setOptionsList(res.data);
  };

  /**
   * 提交草稿箱 / 审核
   * @param {*} action 保存状态 0 待审核 1 审核中 2 已通过 3 已驳回
   */
  const handleSave = async (action) => {
    await axios.post('/news', {
      ...formInfo,
      content: contentInfo,
      region: userInfo.region,
      author: userInfo.username,
      roleId: userInfo.roleId,
      auditState: action,
      publishState: 0, // 0 未发布 1 待发布 2 已发布 3 已下线
      creareTime: Date.now(),
      star: 0,
      view: 0
      // publishTime: 0
    });
    navigate(action === 0 ? '/news-manage/news/bin' : '/audit-manage/news/list');
    notification.info({
      message: `操作完成`,
      description: `您可以到${action === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
      placement: 'bottomRight'
    });
  };

  return (
    <div>
      <Typography>
        <Title>撰写新闻</Title>
      </Typography>
      <Steps
        current={current}
        items={[
          {
            title: '基本信息',
            description: '新闻标题，新闻分类'
          },
          {
            title: '新闻内容',
            description: '新闻主体内容'
          },
          {
            title: '新闻提交',
            description: '保存草稿或者提交审核'
          }
        ]}
      />
      <div className="steps-content">
        <div className={current === 0 ? '' : 'hidden'}>
          <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
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
        </div>
        <div className={current === 1 ? '' : 'hidden'}>
          <NewsEditor
            onValueChange={(values) => {
              setContentInfo(values);
            }}
          />
        </div>
        <div className={current === 2 ? '' : 'hidden'}></div>
      </div>

      <div className="bottom-box">
        {current === 2 && (
          <span>
            <Button className="ones-btn" type="primary" onClick={() => handleSave(0)}>
              保存至草稿箱
            </Button>
            <Button
              className="ones-btn"
              danger
              type="primary"
              onClick={() => handleSave(1)}
            >
              提交审核
            </Button>
          </span>
        )}
        {current > 0 && (
          <Button onClick={handlePrevious} className="ones-btn">
            上一步
          </Button>
        )}
        {current < 2 && (
          <Button onClick={handleNext} className="ones-btn" type="primary">
            下一步
          </Button>
        )}
      </div>
    </div>
  );
}

export default NewsAdd;
