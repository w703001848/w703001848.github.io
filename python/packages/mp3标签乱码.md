```
pip install mutagen
```



```python
import os # 文件操作--------------------
import subprocess

dir_path = os.path.dirname(__file__)

# print(dir_path)

list_f = os.listdir(dir_path)

# print(list_f)
for c in list_f:
  c_path = os.path.join(dir_path, c) # 结合目录名与文件名
  # print(c_path,os.path.isdir(c_path))
  cmd = f'mid3iconv -e GBK "{c_path}"'
  result = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
  print(result.stdout)  # 输出信息
  print(result.stderr)  # 错误信息


```



