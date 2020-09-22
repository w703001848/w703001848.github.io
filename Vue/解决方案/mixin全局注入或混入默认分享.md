# mixin注入全局分享

在Vue中具有Mixin `混入`属性

>   mixins 选项接收一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用的是和 Vue.extend() 一样的选项合并逻辑。也就是说，如果你的混入包含一个 created 钩子，而创建组件本身也有一个，那么两个函数都会被调用。
>    Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
>    [Vue官方介绍](https://links.jianshu.com/go?to=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fapi%2F%23mixins)

-   示例

```javascript
var mixin = {
  created: function () { console.log(1) }
}
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// => 1
// => 2
```

### onShareAppMessage(OBJECT)

小程序中用户点击分享后，在 js 中定义 onShareAppMessage 处理函数（和 onLoad 等生命周期函数同级），设置该页面的分享信息。
 用户点击分享按钮的时候会调用。这个分享按钮可能是小程序右上角原生菜单自带的分享按钮，也可能是开发者在页面中放置的分享按钮；
 此事件需要 return 一个Object，用于自定义分享内容。

```javascript
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 条件编译，只有微信小程序的时候执行
// #ifdef MP-WEIXIN
Vue.mixin({
    onLoad() {
        // 挂载个分享对象，供页面具体配置,默认的分享对象。
        this.$share={
            title:'',
            patch:'',
            desc:''
        }
    },
  // 微信小程序点击分享事件
    onShareAppMessage(res) {
        if(res.from==='button')return // 判断分享来自的类型
        return {
            title:this.$share.title,
            content:this.$share.desc
        }
    }
})
// #endif
const app = new Vue({
    ...App
})
app.$mount()
```

#### 页面使用

```javascript
onLoad() {
    this.$share.title='分享标题'
    this.$share.desc="测试分享描述"
}
```

# mixin混入全局分享

>   最近在通过uniapp 写小程序,接口来自 www.alapi.cn 的数据，因为设置分享的话，要每个页面都写一个 `onShareAppMessage`
>   这样太麻烦了,就查了下资料，通过 `mixins `可以设置一个全局的分享

#### 混入 (mixin)

>   混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
>
>   from:https://cn.vuejs.org/v2/guide/mixins.html

#### 代码

创建一个 `mixins` ，我的文件路径为 ： `static/js/mixins/share.js`

```javascript
export default{
    data(){
        return {
                       //设置默认的分享参数
            share:{
                title:'ALAPI',
                path:'/pages/index/index',
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    },
    onShareAppMessage(res) {
        return {
            title:this.share.title,
            path:this.share.path,
            imageUrl:this.share.imageUrl,
            desc:this.share.desc,
            content:this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
}
```

全局使用, 在 `main.js` 里面 添加全局的 `mixin`

```javascript
import mixin from '@/static/js/mixins/share.js'

Vue.mixin(mixin)
```

这样设置后，每个页面都会有分享按钮了,在页面的 `data` 里面设置和 `mixin` 一样的参数就可以修改分享的参数了

```javascript
export default {
	data(){
        return {
            //设置默认的分享参数
            share:{
                title:'ALAPI',
                path:'/pages/index/index',
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    },
}
```



# 总结

通过Mixin一步操作就可以实现全局分享的方法，mixin还有更多用法（全局的scoket通讯等等）更多的功能等待大家一起发现。