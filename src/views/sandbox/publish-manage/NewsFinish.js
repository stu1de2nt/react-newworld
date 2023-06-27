import React from 'react';
import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublish from '../../../components/publish-manage/usePublish';

function NewsFinish() {
  // 2 - 已上线 （自定义hook）
  const { dataSource } = usePublish(2);
  return (
    <div>
      <NewsPublish dataSource={dataSource} />
    </div>
  );
}

export default NewsFinish