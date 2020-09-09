# instanceof constructor的比较

**为啥JS中判断对象是否是类的实例推荐使用instanceof而不推荐constructor??**
因为instanceof不但可以判断出是直接类的实例（通过new的方式），还可以判断是否是父类的实例
而constructor属性只可以判断出是否是直接类的实例。
从继承的角度看instanceof更加适合。

```javascript
	function Demo(name,age){
        this.name = name;
        this.age = age;
    }

    var demo_1 = new Demo("1023",25);
    /*测试instanceof*/
    console.log(demo_1 instanceof Demo); //true
    console.log(demo_1 instanceof Object);//true

    /*测试constructor*/
    console.log(demo_1.constructor == Demo);//true
    console.log(demo_1.constructor == Object);//false
```



> 原文外链：[instanceof constructor的比较](https://www.imooc.com/article/6499)

