import React, { useEffect, useState } from 'react';
import { Drawer, Row, Col, Tag } from 'antd';
import formatDate from '../../utils/renderTime';
const NewsDrawer = ({ recordInfo, open, onClose }) => {
  const [htmlString, setHtmlString] = useState(recordInfo.content);
  useEffect(() => {
    setHtmlString(recordInfo.content);
  }, [recordInfo]);
  return (
    <Drawer title="查看新闻" placement="left" onClose={onClose} open={open} size="large">
      <b style={{ fontSize: '18px' }}>{recordInfo.title}</b>
      <div style={{ height: '10px' }}></div>
      <Row gutter={[16, 16]}>
        <Col span={8}>新闻作者：{recordInfo.author}</Col>
        <Col span={8}>新闻分类：{recordInfo.category?.title}</Col>
        <Col span={8}>创建时间：{formatDate(recordInfo.creareTime)}</Col>
        <Col span={8}>发布时间：{recordInfo.publishTime || '-'}</Col>
        <Col span={8}>区域：{recordInfo.region}</Col>
        <Col span={8}>
          审核状态：
          <Tag
            color={
              recordInfo.auditState === 0
                ? 'blue'
                : recordInfo.auditState === 1
                ? 'green'
                : recordInfo.auditState === 2
                ? 'lime'
                : 'red'
            }
          >
            {recordInfo.auditState === 0
              ? '待审核'
              : recordInfo.auditState === 1
              ? '审核中'
              : recordInfo.auditState === 2
              ? '已通过'
              : '已驳回'}
          </Tag>
        </Col>
        <Col span={8}>
          发布状态：
          <Tag
            color={
              recordInfo.publishState === 0
                ? ''
                : recordInfo.publishState === 1
                ? 'blue'
                : recordInfo.publishState === 2
                ? 'orange'
                : 'red'
            }
          >
            {recordInfo.publishState === 0
              ? '未发布'
              : recordInfo.publishState === 1
              ? '待发布'
              : recordInfo.publishState === 1
              ? '已发布'
              : '已下线'}
          </Tag>
        </Col>
        <Col span={8}>
          访问数量：<span className="number-view">0</span>
        </Col>
        <Col span={8}>
          点赞数量：<span className="number-view">0</span>
        </Col>
        <Col span={8}>
          评论数量：<span className="number-view">0</span>
        </Col>
      </Row>
      <div style={{ height: '30px' }}></div>
      <b style={{ fontSize: '18px' }}>新闻内容</b>
      <div style={{ height: '10px' }}></div>
      <Row gutter={[16, 16]}>
        <Col span={24} className="col-content">
          <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
        </Col>
      </Row>
    </Drawer>
  );
};

export default NewsDrawer;
