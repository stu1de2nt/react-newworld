import React from 'react';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function NewsLine() {
  // 3 - 已下线 （自定义hook）
  const { dataSource, handleDelete } = usePublish(3);
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button
            onClick={() => handleDelete(id)}
            size="small"
            danger
            type="primary"
            icon={<DeleteOutlined />}
          >
            删除
          </Button>
        )}
      />
    </div>
  );
}
export default NewsLine;
