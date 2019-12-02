/**
 * new Promise(function(resolve, reject) {...})
 * 这个匿名函数是带有 resolve 和 reject 两个参数的函数 。
 * Promise构造函数执行时立即该匿名函数， resolve 和 reject 两个函数作为参数传递给匿名函数
 * （这个匿名函数在Promise构造函数返回所建promise实例对象前被调用）。
 * resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。
 * 这个匿名函数 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用resolve函数来将promise状态改成fulfilled，要么调用reject 函数将promise的状态改为rejected。
 * 如果在这个匿名函数中抛出一个错误，那么该promise 状态为rejected。匿名函数的返回值被忽略。
 */

const PENDING = 'pending'
      FULFILLED = 'fulfilled'
      REJECTED = 'rejected'

function MyPromise(fn){
  if(typeof fn !== 'function') return new Error('Promise resolver undefined is not a function')
  
  this.data = undefined
  this.stat = PENDING
  this.onResolvedCallback = [] // 假如有 p = new Promise(...) ;p.then(...); p.then(...) 均是p的回调，所以采用数组来存储p的各种回调
  this.onRejectedCallback = []

  /** resolve 与 reject 并不是 fn 这个函数带来的函数，
   * 在Promise中 ，调用方式为 resolve([value])
   * 实际执行的代码是在 then 函数中的， 所以， Promise(fn(resolve, reject)) 中
   * resolve ,reject 并不是 fn 自带的回调函数  
   * resolve ,reject 实际上，是触发 then 方法中传递进去的 两个方法的触发器，同时会把自己活得的值传递过去。
   */
  const self = this

  /** 由于resolve的回调函数是then函数的两个参数，实际上，需要在调用 then函数时，才会将成功的回调函数传给 Promise
   * 因此，resolve 与 reject 中有关执行回调的函数语句，是需要等到它们被赋值之后才执行的。 也就是说，then 函数里，
   * 对 Promise 的 onResolvedCallback 与 onRejectedCallback 进行了赋值。让它们变成了函数。 所以，resolve,
   * reject 中，至少有关有关回调函数的执行，需要是脱离于主事件队列的。等待 then 函数中的 非异步宏任务MacroTask执行 之后，才会执行被赋值的回调
   */
  function resolve(value){
    if(self.stat === PENDING){
      self.stat = FULFILLED
      self.data = value 
      setTimeout(()=>{
        self.onResolvedCallback.map(callback => callback(value))
      },0)
    }
  }

  function reject(reason){
    if(self.stat === PENDING){
      self.stat = REJECTED
      self.data = reason
      setTimeout(()=>{
        self.onRejectedCallback.map(callback => callback(value))
      },0)
    }
  }

  try{
    fn(resolve, reject)
  }catch(e){
    reject(e)
  }
}
/**
 * @param {Function} onFulfilled 当 Promise 变成接受状态（fulfilled）时调用的函数。
 * 该函数有一个参数，即接受的最终结果（the fulfillment  value）。
 * 如果该参数不是函数，则会在内部被替换为 (x) => x，即原样返回 promise 最终结果的函数
 * 
 * 当一个 Promise 完成（fulfilled）或者失败（rejected）时，返回函数将被异步调用（由当前的线程循环来调度完成）。
 * 具体的返回值依据以下规则返回。如果 then 中的回调函数：
 * 返回了一个值，那么 then 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
 * 没有返回任何值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。
 * 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
 * 返回一个已经是接受状态的 Promise，那么 then 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
 * 返回一个已经是拒绝状态的 Promise，那么 then 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
 * 返回一个未定状态（pending）的 Promise，那么 then 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。
 * 
 * then 肯定会返回一个 Promise 对象
 */
MyPromise.prototype = {
  /**
   * 核心函数 then
   * then 函数应该算作为一个触发（注册）器，在调用then函数的时候，会将传入then函数的两个函数，注册到它的Promise的两个回调上面
   * @param {Function} onFulfilled 成功的回调函数
   * @param {Function} onRejected 失败的回调函数
   */
  then: function(onFulfilled, onRejected){
    const self = this
    const status = self.stat
    // 假如传入的不是函数，需要做无视处理
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value){}
    onRejected = typeof onRejected === 'function' ? onRejected : function(value){} 

    //假如是已经确定的状态， 则根据状态就可以执行传入的函数， 而无需将回调函数注册在 它的 Promise 中
    // 在是异步调用 resolve/reject 时，它的 Promise 的 stat 是确定的
    if(status === FULFILLED){
      return new Promise((resolve, reject) => {
        try{
          let result = onFulfilled(self.data)
          if(result instanceof MyPromise){
            // 假如返回的是 Promise 类型， 需要将想要执行的回调注册在这个 Promise 当中
            result.then(resolve, reject)
          }else{
            resolve(result)
          }
        } catch(e){
          reject(e)
        }
      })
    }

    if(status === REJECTED){
      return new Promise((resolve, reject) => {
        try{
          let result = onFulfilled(self.data)
          if(result instanceof MyPromise){
            result.then(resolve, reject)
          }else{
            reject(result)
          }
        } catch (e) {
          reject(e)
        }
      })
    }

    if(status === PENDING){
      return new Promise((resolve ,reject)=>{
        self.onResolvedCallback.push( value => {
          try{
            let result = onFulfilled(value)
            if(result instanceof MyPromise){
              result.then(resolve, reject)
            }else{
              resolve(result)
            }
          } catch(e){
            reject(e)
          }
        })

        self.onRejectedCallback.push( value => {
          try{
            let result = onFulfilled(value)
            if(result instanceof MyPromise){
              result.then(resolve, reject)
            }else{
              reject(result)
            }
          } catch (e) {
            reject(e)
          }
        })
      })
    }
    // const promise = new Promise((resolve, reject) => {
    //   self.onResolvedCallback.push(value => {
    //     try{
    //       let val = onFulfilled(value)
    //       // 如果是一个Promise 对象，则 then 获取的是 这个 Promise 的参数
    //       if(val instanceof MyPromise){
    //         //假如 val 已经是一个Promise 对象, 应该取他的结果作为Pormise的结果
    //         // 在进入 then 函数之后，成功与失败的回调函数都不可避免已经存在上个Promise当中了，
    //         // 想让返回的 Promise 能够执行成功与失败的回调，只能把 回调函数的触发器传入 当前Promise 的 回调中
    //         // then 函数实际上就是把 成功与失败的回调函数赋值到它的直接 Promise 对象的成功与回调中
    //         val.then(resolve, reject)
    //       }else{
    //         resolve(val)
    //       }
    //     }catch(e){
    //       reject(e)
    //     }
    //   })
    //   self.onRejectedCallback.push(reason => {
    //     let err = onRejected(reason)
    //     if(err instanceof MyPromise){
    //       reject(err.data)
    //     }else{
    //       reject(err)
    //     }
    //   })
    // })
    // return promise
  }
}

/** 由于setTimeout 仅仅能够做到宏任务的事件队列，所以下面程序执行顺序错误 */
var o = new MyPromise((resolve, reject)=>{
  setTimeout(()=>{
    resolve(1)
  },100)
}).then((val)=>{
  console.log(val)
  var p = new MyPromise((resolve, reject) => {
    setTimeout(()=>resolve(2),100)
  })
  p.then((val)=>{
    console.log(val)
  })
  p.then(()=>{
    console.log(3)
  })
})
o.then(()=>{
  console.log(4)
})
