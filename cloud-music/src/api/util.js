/**
 * 数量单位转换器
 * @param {number} count  数量
 */
export const countUnitTransformation = count => {
  if(count < 0) return 0
  if(count < 10000){
    return count
  } else if(Math.floor( count/10000 ) < 10000){
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}

export const debounce = (func, delay = 300, isImmediately = true) => {
  let timer = null
  return function(...args){
    if(timer){
      if(isImmediately){
        func.apply(this, args)
        isImmediately = false
      }
      return
    }else{
      timer = setTimeout(()=>{
        clearTimeout(timer)
        func.apply(this, args)
      }, delay)
    }
  } 
}