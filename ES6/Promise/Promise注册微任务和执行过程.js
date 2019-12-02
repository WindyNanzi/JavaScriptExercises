const p = {
  1: function () {
    new Promise((resolve, reject) => {
      console.log("外部promise");
      resolve();
    }).then(() => {
      console.log("外部第一个then");
      return new Promise((resolve, reject) => {
        console.log("内部promise");
        resolve();
      }).then(() => {
        console.log("内部第一个then");
      }).then(() => {
        console.log("内部第二个then");
      });
    }).then(() => {
      console.log("外部第二个then");
    });
    /**
     *  外部Promise
     *  外部第一个then
     *  内部promise
     *  内部第一个then
     *  内部第二个zhen
     *  外部第二个then
     */
  },
  2: function () {
    new Promise((resolve, reject) => {
      console.log("外部promise");
      resolve();
    })
      .then(() => {
        console.log("外部第一个then");
        new Promise((resolve, reject) => {
          console.log("内部promise");
          // 在这里注册了 这个promise的 then,所以要相对于外部的第二个then要先执行
          resolve();
        })
          .then(() => {
            console.log("内部第一个then");
          })
          .then(() => {
            console.log("内部第二个then");
          });
        console.log('我也会在外部第一个then中新建的Promise的第二个then函数之前执行');
        return '我会在外部第一个then中新建的Promise的第二个then函数之前执行'
      })
      .then((value) => {
        console.log(value);
        console.log("外部第二个then");
      });
    /**
     *  外部Promise
     *  外部第一个then
     *  内部promise
     *  我会在外部第一个then中新建的Promise的第二个then函数之前执行
     *  内部第一个then
     *  外部第二个then
     *  内部第二个zhen
     */

  },
  3: function(){
    new Promise((resolve, reject) => {
      console.log("外部promise");
      resolve();
    })
      .then(() => {
        console.log("外部第一个then");
        let p = new Promise((resolve, reject) => {
          console.log("内部promise");
          resolve();
        })
        // 这里注册对两个then都进行了注册所以会先执行内部的所有then
        p.then(() => {
            console.log("内部第一个then");
          })
        p.then(() => {
            console.log("内部第二个then");
          });
      })
      .then(() => {
        console.log("外部第二个then");
      });
    /**
     *  外部Promise
     *  外部第一个then
     *  内部promise
     *  内部第一个then
     *  内部第二个zhen
     *  外部第二个then
     */
  },
  4: function(){
    let p = new Promise((resolve, reject) => {
      console.log("外部promise");
      resolve();
    })
    // 同上，这里先注册了外部promise 的 then
    p.then(() => {
        console.log("外部第一个then");
        new Promise((resolve, reject) => {
          console.log("内部promise");
          resolve();
        })
          .then(() => {
            console.log("内部第一个then");
          })
          .then(() => {
            console.log("内部第二个then");
          });
      })
    p.then(() => {
        console.log("外部第二个then");
      });
    /**
     *  外部Promise
     *  外部第一个then
     *  内部promise
     *  外部第二个then
     *  内部第一个then
     *  内部第二个zhen 
     */
  },
  // 巩固题
  5: function(){
    new Promise((resolve, reject) => {
      console.log("外部promise");
      resolve();
    })
      .then(() => {
        console.log("外部第一个then");
        new Promise((resolve, reject) => {
          console.log("内部promise");
          resolve();
        })
          .then(() => {
            console.log("内部第一个then");
          })
          .then(() => {
            console.log("内部第二个then");
          });
        return new Promise((resolve, reject) => {
          console.log("内部promise2");
          resolve();
        })
          .then(() => {
            console.log("内部第一个then2");
          })
          .then(() => {
            console.log("内部第二个then2");
          });
      })
      .then(() => {
        console.log("外部第二个then");
      });
    /**
     *  外部Promise
     *  外部第一个then
     *  内部promise
     *  内部promise2
     *  内部第一个then
     *  内部第一个then2
     *  内部第二个zhen 
     *  内部第二个zhen2
     *  外部第二个then
     */
  },
  6: function(){
    var p0 = new Promise((resolve, reject) => {
      resolve(1)
    })
    p0.then((value)=>{
      console.log(value)
      return new Promise((resolve, reject) => {
        resolve(2)
      })
    })

    p0.then((value) => {
      console.log(value)
      return 3
    }).then((value) => {
      console.log(value)
      return new Promise((resolve, reject) => {
        resolve(4)
      }).then((value) => {
        console.log(value)
        return 5
      })
    })

    p0.then((value) => {
      console.log(value)
    })
  }
}
function PromiseTest(i) {
  p[i]()
}



PromiseTest(6)