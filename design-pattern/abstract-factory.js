class MobilePhoneFactory {
  createOS(){
    throw new Error('抽象工厂不允许直接调用，你需要将我改写')
  }
  createHardWare(){
    throw new Error('抽象工厂不允许直接调用，你需要将我改写')
  }
}

class FakeStarFactory extends MobilePhoneFactory{
  createOS(){
    //安卓系统实例
    return new AndroidOS()
  }
  createHardWare(){
    //高通硬件实例
    return new QualcommHardWare()
  }
}

class OS {
  controlHardWare(){
    throw new Error('抽象产品方法不允许直接调用，你需要将我改写')
  }
}

class AndroidOS extends OS{
  controlHardWare(){
    console.log('我会用安卓的方式去操作硬件')
  }
}

class AppleOS extends OS{
  controlHardWare(){
    console.log('我会用🍎的方式去操作硬件')
  }
}

class HardWare{
  operateByOrder(){
    throw new Error('抽象产品方法不允许直接调用，你需要将我改写')
  }
}

class QualcommHardWare extends HardWare {
  operateByOrder(){
    console.log('我会用高通的方式去运转')
  }
}

class MiWare extends HardWare {
  operateByOrder(){
    console.log('我会用小米的方式去运转')
  }
}

const myPhone = new FakeStarFactory()
const myOS = myPhone.createOS()
const myHardWare = myPhone.createHardWare()
myOS.controlHardWare()
myHardWare.operateByOrder()