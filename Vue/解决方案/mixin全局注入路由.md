# vue 项目中 全局使用 mixins

在`src`目录下新建`mixins`目录。`mixins`目录里新建`index.js`文件。在这里写一个`loadPage`路由跳转方法供全局使用

```javascript
// src/mixins/index.js
let mixin={
  data(){
    return{};
  },
  methods:{
    loadPage(routerName,param){
      if(param){
        this.$router.push({name:routerName,query:param});
      }else{
        this.$router.push({name:routerName});
      }
    }
  }
};
export default mixin;
```

### 把mixins注册全局

```javascript
// src/main.js
import Mixin from './mixins';
Vue.mixin(Mixin);
```

### 使用mixins里的方法

```javascript
// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/about',
      name: 'About',
      component:resolve => require(['@/pages/About'],resolve)
    },
    {
      path: '/index',
      name: 'Index',
      component:resolve => require(['@/pages/Index'],resolve)
    },
    {
      path: '/product',
      name: 'Product',
      component:resolve => require(['@/pages/Product'],resolve)
    }
  ]
})
```

页面调用`mixins`里的`loadPage`方法

```vue
<p @click="loadPage('Index')">Index</p>
```

