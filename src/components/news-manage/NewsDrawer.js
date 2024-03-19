import React, { useEffect, useState } from 'react';
import { Drawer, Row, Col, Tag } from 'antd';
import formatDate from '../../utils/renderTime';
const NewsDrawer = ({ recordInfo, open, onClose }) => {
  const [htmlString, setHtmlString] = useState(recordInfo.content);

  useEffect(() => {
    setHtmlString(recordInfo.content);
  }, [recordInfo]);

  const auditList = ['待审核', '审核中', '已通过', '已驳回'];
  const publinshList = ['未发布', '待发布', '已上线', '已下线'];
  const colorList = ['blue', 'green', 'lime', 'red'];
  const colorListPub = ['', 'blue', 'orange', 'red'];

  return (
    <Drawer title="查看帖子" placement="left" onClose={onClose} open={open} size="large">
      <b style={{ fontSize: '18px' }}>{recordInfo.title}</b>
      <div style={{ height: '10px' }}></div>
      <Row gutter={[16, 16]}>
        <Col span={8}>帖子作者：{recordInfo.author}</Col>
        <Col span={8}>帖子分类：{recordInfo.category?.title}</Col>
        <Col span={8}></Col>
        <Col span={8}>创建时间：{formatDate(recordInfo.creareTime)}</Col>
        <Col span={8}>
          发布时间：{recordInfo.publishTime ? formatDate(recordInfo.publishTime) : '-'}
        </Col>
        <Col span={8}></Col>
        <Col span={8}>区域：{recordInfo.region}</Col>
        <Col span={8}>
          审核状态：
          <Tag color={colorList[recordInfo.auditState]}>
            {auditList[recordInfo.auditState]}
          </Tag>
        </Col>
        <Col span={8}>
          发布状态：
          <Tag color={colorListPub[recordInfo.publishState]}>
            {publinshList[recordInfo.publishState]}
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
      <b style={{ fontSize: '18px' }}>帖子内容</b>
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
