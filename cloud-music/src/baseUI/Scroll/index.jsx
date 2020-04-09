import React,{ forwardRef,useState,useEffect,useImperativeHandle,useRef, useMemo } from "react"
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import Loading from '../Loading'
import { debounce } from '../../api/util'

const SrcollContaniner = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Scroll = forwardRef((props, ref) => {
  // better-scroll 实例对象
  const [bScroll, setBScroll] = useState()
  // current 指向初始化 bs实例需要需要的 DOM 元素
  const scrollContaninerRef = useRef()

  const {direction, click, refresh,  bounceTop, bounceBottom, pullDownLoading, pullUpLoading} = props
  const {pullUp, pullDown, onScroll} = props

  useEffect(()=> {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    })

    setBScroll(scroll)
    return ()=> {
      setBScroll(null)
    }
  }, [bounceBottom, bounceTop, click, direction])

  // 重新渲染需要刷新实例
  useEffect(()=>{
    if(refresh && bScroll){
      bScroll.refresh()
    }
  })

  // 绑定scroll事件
  useEffect(()=>{
    if(!bScroll || !onScroll) return
    bScroll.on('scroll',(scroll)=>{
      onScroll(scroll)
    })
    return ()=>{
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])


  const pullUpDebounce = useMemo(()=>{
    return debounce(pullUp)
  }, [pullUp])

  const pullDownDebounce = useMemo(()=> {
    return debounce(pullDown) 
  }, [pullDown])

  // 进行上拉到底的判断
  useEffect(()=>{
    if(!bScroll || !pullUp) return
    bScroll.on('scrollEnd', ()=>{
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUpDebounce()
      }
    })
    return ()=>{
      bScroll.off('scrollEnd')
    }
  },
  [pullUp, bScroll, pullUpDebounce]
  )

  //  下拉判断，调用下拉刷新函数
  useEffect(
    debounce(()=>{
      if(!bScroll || !pullDown) return
      bScroll.on('touchEnd', (pos)=>{
        if(pos.y > 50){
          pullDownDebounce()
        }
      })

      return ()=>{
        bScroll.off('touchEnd')
      }
    }), 
    [pullDown, bScroll, pullDownDebounce]
  )

  useImperativeHandle(ref, ()=>({
    refresh(){
      if(bScroll){
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll(){
      if(bScroll){
        return bScroll
      }
    }
  }))

  return (
    <SrcollContaniner ref={scrollContaninerRef}>
      { pullDownLoading ? (<Loading></Loading>):null }
      {props.children}
      { pullUpLoading ? (<Loading></Loading>):null }
    </SrcollContaniner>
  )
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
}

Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
}

export default Scroll