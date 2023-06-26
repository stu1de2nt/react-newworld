import React from 'react'
import { Button } from 'antd'
import axios from 'axios'
function Home() {
  const ajax = () => {
    // 查询数据 get
    // axios.get('http://localhost:5000/posts').then(res => {
    //   console.log('get:', res.data)
    // })
    
    // 新增数据 post
    // axios.post('http://localhost:5000/posts', {
    //   title: '新增的新闻1',
    //   author: '张三'
    // })

    // 修改数据 put
    // axios.put('http://localhost:5000/posts/1', {
    //   title: '新闻发布-new1',author: '李四'
    // })

    // 更新数据
    // axios.patch('http://localhost:5000/posts/1', {
    //   title: '新闻修改-patch1'
    // })

    // 删除数据 delete
    // axios.delete('http://localhost:5000/posts/2')

    // 关联查询 _embed 向下关联
    // axios.get('http://localhost:5000/posts?_embed=comments').then(res => {
    //   console.log('_embed:', res.data)
    // })

    // 关联查询 _expand 向上查询
    axios.get('http://localhost:5000/comments?_expand=post').then(res => {
      console.log('_expand:', res.data)
    })
  }
  return (
    <div>
      <Button type='primary' onClick={ajax}>Button</Button>
    </div>
  )
}

export default Home