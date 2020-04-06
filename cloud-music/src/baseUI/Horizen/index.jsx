import React,{ memo,useRef } from 'react'
import PropTypes from 'prop-types'
import Scroll from '../Scroll'
import { List,ListItem } from './style'
import { useEffect } from 'react'

function Horizen(props) {
  const { list, oldVal, title } = props
  const { handleClick } = props

  const Categore = useRef(null)

  useEffect(() => {
    let categoryDOM = Categore.current
    let tagElemes = categoryDOM.querySelectorAll('span')
    let totalWidth = 0
    Array.from(tagElemes).forEach(ele => {
      totalWidth += ele.offsetWidth
    })
    categoryDOM.style.width = `${totalWidth}px`
  }, [])

  return (
    <>
      <Scroll direction={'horizental'}>
        <div ref={Categore}>
          <List>
            <span>{ title }</span>
            {
              list.map( item => {
                let { key,name } = item
                return (
                  <ListItem
                    key={key}
                    className = {`${oldVal === key ? 'selected' : ''}`}
                    onClick = { ()=> handleClick(key) }
                  >
                    {name}
                  </ListItem>
                )
              })
            }
          </List>
        </div>
      </Scroll>
    </>
  )
}

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: ()=>{}
}

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default memo(Horizen)