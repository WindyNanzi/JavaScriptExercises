function EventEmitter(){
  this._events = {}
}

EventEmitter.prototype.on = 
  EventEmitter.prototype.addListener = function(type = 'any', fn, flag = false){
    if(!this._events) this._events = Object.create(null)
    if(typeof fn !== 'function') fn = ()=>{}

    if(!this._events[type]){
      this._events[type] = [fn]
    }

    if(flag){
      this._events[type].unshift(fn)
    }else{
      this._events[type].push(fn)
    }
  }

EventEmitter.prototype.emit = function(type = 'any',  ...args){
  if(this._events && this._events[type]){
    this._events[type].forEach( fn => {
      fn.call(this, ...args)
    })
  }
}

EventEmitter.prototype.off = 
  EventEmitter.prototype.removeListener = function(type = 'any', fn){
    if( !this._events || !this._events[type]) return
    this._events[type] = 
      this._events[type].filter( item => {
        return item !== fn && item.orgin !== fn
      }) 
  }

EventEmitter.prototype.once = function(type = 'any',fn) {
  var _this = this
  const once = (...args) => {
    fn(...args)
    _this.off(type, once)
  }
  // 此处是方便 off 指向
  once.orgin = fn
  _this.on(type, once)
}