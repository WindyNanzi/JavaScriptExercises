import React, { memo } from 'react'
import { ListWrapper, List, ListItem } from './style'
import { countUnitTransformation } from '../../api/util'
export default memo((props)=> {
  const  { recommendList } = props
  
  return (
    <>
      <ListWrapper>
        <h1 className='title'> 推荐歌单 </h1>
        <List>
          {
            recommendList.map((item, index) => {
              const { id,picUrl,playCount,name } = item
              return (
                <ListItem key={id+picUrl}>
                  <div className='img_wrapper'>
                    <div className='decorate'></div>
                    {/* 加此参数可减小请求的图片资源大小 */}
                    <img 
                      src={picUrl + '?param=300x300'}
                      width='100%'
                      height='100%'
                      alt='music'
                    />
                    <div className='play_count'>
                      <i className='iconfont play'>&#xe84e;</i>
                      <span className='count'>
                        {   countUnitTransformation(playCount) }
                      </span>
                    </div>
                  </div>
                  <div className="desc">{name}</div>
                </ListItem>
              )
            })
          }
        </List>
      </ListWrapper>
    </>
  )
})