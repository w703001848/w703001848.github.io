import json
import os

f = open('name.txt')

for line in f:
    line = line.strip()
    # 文件夹
    f_line = open(line + '/entry.json', encoding='utf-8')
    obj = json.load(f_line)
    # new文件名
    name = obj['page_data']['part']
    page = obj['page_data']['page']
    print(page,name)
    # 重命名
    # os.rename(line + '.mp4', 'P' + str(page) + ' ' + name + '.mp4')
    
    f_line.close()
    
f.close()
