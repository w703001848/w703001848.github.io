## 安装

```cmd
pip install pandas
```

```python
# import panda
import pandas as pd

mydataset = {
  'sites': ["Google", "Runoob", "Wiki"],
  'number': [1, 2, 3]
}

myvar = pd.DataFrame(mydataset)

print(myvar)
```



## Series 构造方法如下：

```python
pandas.Series( data, index, dtype, name, copy)
```

参数说明：

- **data**：一组数据(ndarray 类型)。
- **index**：数据索引标签，如果不指定，默认从 0 开始。
- **dtype**：数据类型，默认会自己判断。
- **name**：设置名称。
- **copy**：拷贝数据，默认为 False。

```python
myvar = pd.Series(a, index = ["x", "y", "z"])
```



## DataFrame 构造方法如下：

```
pandas.DataFrame( data, index, columns, dtype, copy)
```

参数说明：

- **data**：一组数据(ndarray、series, map, lists, dict 等类型)。
- **index**：索引值，或者可以称为行标签。
- **columns**：列标签，默认为 RangeIndex (0, 1, 2, …, n) 。
- **dtype**：数据类型。
- **copy**：拷贝数据，默认为 False。



## Pandas CSV 文件

```python
import pandas as pd

df = pd.read_csv('nba.csv')

print(df)
print(df.to_string())

# 保存 dataframe
df.to_csv('site.csv')
```

**to_string()** 用于返回 DataFrame 类型的数据，如果不使用该函数，则输出结果为数据的前面 5 行和末尾 5 行，中间部分以 **...** 代替。

**head(*n*)** 方法用于读取前面的 n 行，如果不填参数 n ，默认返回 5 行。

**tail(*n*)** 方法用于读取尾部的 n 行，如果不填参数 n ，默认返回 5 行，空行各个字段的值返回 **NaN**。

**info()** 方法返回表格的一些基本信息：



## Pandas JSON

```python
import pandas as pd

df = pd.read_json('sites.json')
   
print(df.to_string())
```

...

## Pandas 数据清洗