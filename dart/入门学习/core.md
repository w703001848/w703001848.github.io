# dart:core - 数字，集合，字符串等

## 控制台打印
`print('I drink $tea.');`

## 变量声明

### var
它可以接收任何类型的变量，但最大的不同是Dart中var变量一旦赋值，类型便会确定，则不能再改变其类型

### dynamic和Object
Object 是Dart所有对象的根基类，也就是说所有类型都是Object的子类(包括Function和Null)，所以任何类型的数据都可以赋值给Object声明的对象. 
dynamic与var一样都是关键词,声明的变量可以赋值任意对象。 而dynamic与Object相同之处在于,他们声明的变量可以在后期改变赋值类型。

dynamic与Object不同的是,dynamic声明的对象编译器会提供所有可能的组合, 而Object声明的对象只能使用Object的属性与方法, 否则编译器会报错。

### final和const
一个 final 变量只能被设置一次，两者区别在于：const 变量是一个编译时常量，final变量在第一次使用时被初始化。被final或者const修饰的变量，变量类型可以省略

### 函数Function
函数声明如果没有显式声明返回值类型时会默认当做dynamic处理

```
bool isNoble(int atomicNumber) {
 return _nobleGases[atomicNumber] != null;
}
```

#### 简写语法
`bool isNoble (int atomicNumber)=> _nobleGases [ atomicNumber ] ！= null ;`

#### 函数作为参数传递
```
void execute(var callback) {
    callback();
}
execute(() => print("xxx"))
```

## 数字
### [num](./core/num.md) ，[int](./core/int.md) 以及 [double](./core/double.md) 类

#### parse() 方法将字符串转换为整型或双浮点型对象
```
assert(int.parse('42') == 42);
assert(int.parse('0x42') == 66);
assert(double.parse('0.50') == 0.5);
```

num 的 parse() 方法，该方法可能会创建一个整型，否则为浮点型对象
```
assert(num.parse('42') is int);
assert(num.parse('0x42') is int);
assert(num.parse('0.50') is double);
```

添加 radix 参数，指定整数的进制基数： 
`assert(int.parse('42', radix: 16) == 66);`

#### toString() 方法将整型或双精度浮点类型转换为字符串类型。
```
assert(42.toString() == '42');
assert(123.456.toString() == '123.456');
```

#### toStringAsFixed(). 指定小数点右边的位数， 
`assert(123.456.toStringAsFixed(2) == '123.46');`

## 字符串

### 正则表达式
RegExp类提供与JavaScript正则表达式相同的功能。


## 集合
