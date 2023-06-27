import React from 'react';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';

function NewsLine() {
  // 3 - 已下线 （自定义hook）
  const { dataSource } = usePublish(3);
  return (
    <div>
      <NewsPublish dataSource={dataSource} />
    </div>
  );
}
export default NewsLine