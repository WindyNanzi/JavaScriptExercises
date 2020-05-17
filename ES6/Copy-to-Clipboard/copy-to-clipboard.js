function deselectCurrent(){
  //window.getSelection 方法返回一个 Selectin 对象，Selection对象表示用户选择的文本范围或插入符号的当前位置
  const selection = document.getSelection()  //表示用户选择的文本范围或光标的当前位置
  //rangeCount：该选区连续范围的数量，用户通常情况下只能选中一段连续的内容，所以这个值通常是0或者1，通过js可以使这个值变大
  if(!selection.rangeCount){
    return ()=>{}
  }

  const ranges = []
  for(let i = 0; i<selection.rangeCount; i++){
    // 返回选区包含的指定区域（Range）的引用
    // Range 接口表示一个包含节点与文本节点的一部分的文档片段。
    ranges.push(selection.getRangeAt(i))
  }

  // 将所有的区域都从选区中移除
  selection.removeAllRanges()

  const active = document.activeElement //获取当前获得焦点的元素

  switch(active.tagName.toUpperCase()){
    case 'INPUT':
    case 'TEXTAREA':
      active.blur() //使得元素失去焦点
      break

    default:
      active = null
      break
  }

  return function(){
    // 实际上 MDN 对 Selection 对象上不包含 type 属性，而 typescript 的接口中还包含有这个属性
    selection.type === 'Caret' ? selection.removeAllRanges() : null
    
    if(!selection.rangeCount){
      ranges.forEach((range)=>{
        selection.addRange(range)
      })
    }

    active ? active.focus() : null

  }
}


const cliboardToIE11Formatting = {
  'text/plain': 'Text',
  'text/html': 'Url',
  'default': 'Text'
}

const DEFAULT_MESSAGE = 'Copy to clipboard: #{key}, Enter'

function format(message){
  const copyKey = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + 'C'
  return message.replace(/#{\s*key\s*}/g, copyKey)
}

function copy(text, options){
  let message,
      reselectPrevious,
      range,
      selection,
      mark,
      success = false
  
  if(!options){
    options = {}
  }
  reselectPrevious = deselectCurrent()

  try{
    reselectPrevious = deselectCurrent()

    range = document.createRange()
    selection = document.getSelection()

    mark = document.createElement('span')
    mark.textContent = text

    mark.style.all = 'unset'
    mark.style.position = 'fixed'
    mark.style.top = 0
    mark.style.clip = 'rect(0,0,0,0)'
    mark.style.whiteSpace = 'pre'

    mark.style.webkitUserSelect = 'text'
    mark.style.MozUserSelect = 'text'
    mark.style.msUserSelect = 'text'
    mark.style.userSelect = 'text'

    mark.addEventListener('copy', function(e){
      e.stopPropagation()

      if(options.format){
        e.preventDefault()
        if(typeof e.clipboardData === 'undefined'){ //IE11
          window.clipboardData.clearData()
          var format = cliboardToIE11Formatting[options.format] || cliboardToIE11Formatting['default']
          window.clipboardData.setData(format, text)
        } else {
          e.clipboardData.clearData()
          e.clipboardData.setData(options.format, text)
        }
      }
      if(options.onCopy){
        e.preventDefault()
        options.onCopy(e.clipboardData)
      }

    })

    document.body.appendChild(mark)

    range.selectNodeContents(mark)
    selection.addRange(range)

    var successful = document.execCommand('copy')
    if(!successful){
      throw new Error('copy command was unsuccessful')
    }
    success = true

  } catch(e){
    try{
      window.clipboardData.setData(options.format || 'text', text)
      options.onCopy && options.onCopy(window.clipboardData)
      success = true
    } catch(err){
      message = format(options.message ? options.message : DEFAULT_MESSAGE)
      window.prompt(message, text)
    }
  } finally {

    if(selection){
      if(typeof selection.removeRange === 'function'){
        selection.removeRange(range)
      }else{
        selection.removeAllRanges()
      }
    }

    if(mark){
      document.body.removeChild(mark)
    }
    reselectPrevious()
  }
  
  return success
}