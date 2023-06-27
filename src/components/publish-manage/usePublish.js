// 自定义hooks

import axios from 'axios';
import { useEffect, useState } from 'react';

function usePublish(publishState) {
  const [dataSource, setDataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishState]);

  const getList = async () => {
    const res = await axios.get(
      `/news?author=${username}&publishState=${publishState}&_expand=category`
    );
    setDataSource(res.data);
  };
  return {
    dataSource
  };
}

export default usePublish;
