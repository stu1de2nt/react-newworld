import React from 'react';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

function NewsWait() {
  // 1 - 待发布 （自定义hook）
  const { dataSource, handleWait } = usePublish(1);
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button
            onClick={() => handleWait(id)}
            size="small"
            type="primary"
            icon={<CheckCircleOutlined />}
          >
            发布
          </Button>
        )}
      />
    </div>
  );
}

export default NewsWait;
