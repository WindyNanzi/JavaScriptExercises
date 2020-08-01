abstract class  Creator {
  public abstract factoryMethod(): Product

  public someOperation(): string {
    const product = this.factoryMethod()
    return `Creator: ${product.operation()}` 
  }
}


class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product{
    return new ConcreteProduct1()
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product{
    return new ConcreteProduct2()
  }
}

interface Product{
  operation(): string
}

class ConcreteProduct1 implements Product{
  public operation():string {
    return 'Product1'
  }
}

class ConcreteProduct2 implements Product{
  public operation():string{
    return 'Product2'
  }
}

function clientCode(creator: Creator){
  console.log(creator.someOperation())
}

clientCode(new ConcreteCreator1())