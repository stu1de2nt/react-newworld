import React from 'react';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';
import { MinusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function NewsFinish() {
  // 2 - 已上线 （自定义hook）
  const { dataSource, handleFinish } = usePublish(2);
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button
            onClick={() => handleFinish(id)}
            size="small"
            type="primary"
            danger
            icon={<MinusSquareOutlined />}
          >
            下线
          </Button>
        )}
      />
    </div>
  );
}
// 
export default NewsFinish;
