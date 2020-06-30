class SingleDog {
  show() {
    console.log('我是一个单例对象')
  }
  static getInstance() {
    if(!SingleDog.instance) {
      SingleDog.instance = new SingleDog()
    }
    return SingleDog.instance
  }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

console.log(s1 === s2)



////
/**
 * 实现一个单例的Storage,以单例形式为localStorage做封装，实现方法getItem,setItem
 */
function StorageBase(){}
StorageBase.prototype.getItem = key => {
  localStorage.getItem(key)
}
StorageBase.prototype.setItem = (key, value) => {
  localStorage.setItem(key, value)
}

const Storage = (()=>{
  let instance = null

  return ()=>{
    if(!instance){
      instance = new StorageBase()
    }
    return instance
  }
})()


/**
 * 全局模态框
 */

const Model = (()=>{
  let model = null
  return () => {
    if(!model){
      model = document.createElement('dialog')
      model.className = 'hide'
      model.__proto__.close = () => {
        const classNameList = model.className.split(' ')
        if(!classNameList.includes('hide')){
          classNameList.push('hide')
          model.className = classNameList.join(' ').replace('show', '')
        }
      }
      model.__proto__.open = () => {
        const classNameList = model.className.split(' ')
        if(!classNameList.includes('show')){
          classNameList.push('show')
          model.className = classNameList.join(' ').replace('hide', '')
        }
      }
    }
    return model
  }
})()