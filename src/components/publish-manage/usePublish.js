// 自定义hooks
import axios from 'axios';
import { Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

function usePublish(publishState) {
  const [dataSource, setDataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    axios
      .get(`/news?author=${username}&publishState=${publishState}&_expand=category`)
      .then((res) => {
        setDataSource(res.data);
      });
  }, [publishState, username]);

  /**
   * 数据发布
   * @param {*} id 数据id
   */
  const handleWait = (id) => {
    console.log('数据发布:', id);
    showConfirm(id, 0);
  };

  /**
   * 数据下线
   * @param {*} id 数据id
   */
  const handleFinish = (id) => {
    console.log('数据下线:', id);
    showConfirm(id, 1);
  };

  /**
   * 数据删除
   * @param {*} id 数据id
   */
  const handleDelete = (id) => {
    console.log('数据删除:', id);
    showConfirm(id, 2);
  };

  const contentText = ['发布', '下线', '删除'];
  /**
   * 操作确认
   * @param {*} id 数据id
   * @param {*} type 操作区分 0 发布 1 下线 2 删除
   */
  const showConfirm = (id, type) => {
    confirm({
      title: `确认${contentText[type]}吗？`,
      icon: <ExclamationCircleFilled />,
      onOk() {
        setDataSource(dataSource.filter((item) => item.id !== id));
        if (type === 0) {
          pubState(id);
        } else if (type === 1) {
          lineState(id);
        } else {
          deleteState(id);
        }
        notification.info({
          message: `操作完成`,
          description: `您已将帖子${contentText[type]}${
            type === 0
              ? '可以在[发布管理/已发布]中查看'
              : type === 1
              ? '可以在[发布管理/已下线]中查看'
              : '。'
          }`,
          placement: 'bottomRight'
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  /**
   * 发布请求
   * @param {*} id 数据id
   */
  const pubState = async (id) => {
    await axios.patch(`/news/${id}`, {
      publishState: 2,
      publishTime: Date.now()
    });
  };

  /**
   * 下线请求
   * @param {*} id 数据id
   */
  const lineState = async (id) => {
    await axios.patch(`/news/${id}`, {
      publishState: 3
    });
  };

  const deleteState = async (id) => {
    await axios.delete(`/news/${id}`);
  };

  return {
    dataSource,
    handleWait,
    handleFinish,
    handleDelete
  };
}

export default usePublish;
