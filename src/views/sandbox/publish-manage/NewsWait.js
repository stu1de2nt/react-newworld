import React from 'react';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';

function NewsWait() {
  // 1 - 待发布 （自定义hook）
  const { dataSource } = usePublish(1);
  return (
    <div>
      <NewsPublish dataSource={dataSource} />
    </div>
  );
}

export default NewsWait;
