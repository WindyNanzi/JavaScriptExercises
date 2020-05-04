import React,{ memo,useEffect } from 'react'
import { connect } from 'react-redux'
import { getRankList } from './store'
import { filterIndex } from '../../api/util'
import { renderRoutes } from 'react-router-config'
import { SongList, List, ListItem,Container } from './style'
import Loading from '../../baseUI/Loading/index'
import Scroll from '../../baseUI/Scroll/index'


function Rank(props){
  const { rankList: list, loading } = props
  const { getRankListDataDispatch } = props

  let rankList = list

  useEffect(()=>{
    if(list.length === 0){
      getRankListDataDispatch()
    }
  }, [])

  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0 ,globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            const { first, second } = item
            return (
              <li
                key = { index }
              >
                {index + 1}. { first } - { second }
              </li>
            )
          })
        }
      </SongList>
    ) : null
  }

  const renderRankList = (list, global) => {
    return (
      <List globalRank = {global}>
        {
          list.map((item) => {
            const { coverImgId, coverImgUrl, tracks, name, updateFrequency } = item
            return (
              <ListItem
                key = { coverImgId }
                tracks = { tracks }
              onClick = { ()=> {/* enterDetail(name) */} }
              >
                <div className='img_wrapper'>
                  <img src = {coverImgUrl} alt=''/>
                  <div className = 'decorate'></div>
                  <span className='update_frequecy'>
                    {updateFrequency}
                  </span>
                </div>
                { renderSongList(tracks) }
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  let displayStyle = loading ? { 'display': 'none' } : { 'display': '' }

  return (
    <Container>
      <Scroll>
        <div>
          <h1 
            className = 'offical'
            style = { displayStyle }
          >
            官方版
          </h1>
          { renderRankList(officialList) }
          <h1 
            className = 'global'
            style = { displayStyle }
          >
            全球榜
          </h1>
          { renderRankList(globalList, true) }
          { loading ? <Loading></Loading> : null }
        </div>
      </Scroll>
      { renderRoutes(props.route.routes) }
    </Container>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.rank.rankList,
  loading: state.rank.loading
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch(){
      dispatch(getRankList())
    }
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(memo(Rank))