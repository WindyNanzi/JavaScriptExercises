import React, { memo } from 'react'
import { Container, TopDesc, Menu, SongList, SongItem } from './style'
import { CSSTransition } from 'react-transition-group'
import { useState } from 'react'
import { getName, countUnitTransformation } from '../../api/util'
import Header from '../../baseUI/Header'
import Scroll from '../../baseUI/Scroll'

function Album(props){
  const [showStatus, setShowStatus] = useState(true)
  
  const currentAlbum = {
    creator: {
      avatarUrl: "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
      nickname: "浪里推舟"
    },
    coverImgUrl: "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
    subscribedCount: 2010711,
    name: "听完就睡，耳机是天黑以后柔软的梦境",
    tracks:[
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{name: "张学友"}, {name: "周华健"}],
        al: {
          name: "学友 热"
        }
      },
    ]
  }

  const handleBack = () => {
    setShowStatus(false)
  }

  return (
    <CSSTransition
      in={ showStatus }
      timeout = { 300 }
      classNames = 'fly'
      appear = { true }
      unmountOnExit
      onExited = { props.history.goBack }
    >
      <Container>
        <Header 
          title = { ' 返回' }
          handleClick = { handleBack }
        ></Header>
        <Scroll bounceTop={false}>
          <div>
            <TopDesc
              background = { currentAlbum.coverImgUrl }
            >
              <div className='background'>
                <div className='filter'></div>
              </div>
              <div className='img_wrapper'>
                <div className='decorate'></div>
                <img src = {currentAlbum.coverImgUrl} alt='' />
                <div className='play_count'>
                  <i className='iconfont play'>&#xe84e;</i>
                  <span className='count'>
                    { Math.floor(currentAlbum.subscribedCount / 1000)/10 } 万
                  </span>
                </div>
              </div>
              <div className='desc_wrapper'>
                <div className='title'>
                  { currentAlbum.name }
                </div>
                <div className="person">
                  <div className="avatar">
                    <img src= { currentAlbum.creator.avatarUrl } alt=""/>
                  </div>
                  <div className="name">
                    { currentAlbum.creator.nickname }
                  </div>
                </div>
              </div>
            </TopDesc>
            <Menu>
              <div>
                <i className="iconfont">&#xe78b;</i>
                <span>评论</span>
              </div>
              <div>
                <i className="iconfont">&#xe7cb;</i>
                <span>点赞</span>
              </div>
              <div>
                <i className="iconfont">&#xe7e0;</i>
                <span>收藏</span>
              </div>
              <div>
                <i className="iconfont">&#xe7fd;</i>
                <span>更多</span>
              </div>
            </Menu>
            <SongList>
              <div className="first_line">
                <div className="play_all">
                  <i className="iconfont"></i>
                  <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
                </div>
                <div className="add_list">
                  <i className="iconfont"></i>
                  <span > 收藏 ({ countUnitTransformation(currentAlbum.subscribedCount)})</span>
                </div>
              </div>
              <SongItem>
                {
                  currentAlbum.tracks.map((item, index)=>{
                    return (
                      <li key={index}>
                        <span className="index">{index + 1}</span>
                        <div className="info">
                          <span>{item.name}</span>
                          <span>
                            {getName(item.ar) } - { item.al.name}
                          </span>
                        </div>
                      </li>
                    )
                  })
                }
              </SongItem>
            </SongList>
          </div>
        </Scroll>
      </Container>
    </CSSTransition>
    
  )
}

export default memo(Album)