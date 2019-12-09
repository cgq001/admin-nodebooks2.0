# 博客2.0版本，管理后台


PC展示端预览地址: http://www.nodebook.top/#/

## 初始化
```
yarn install
```

### 运行
```
yarn run serve
```

### 打包
```
yarn run build
```

### 说明

本站为强制管理后台注册以后绑定邮箱，
如不需要 可在views/layout/head/header.vue 第150行，设置 this.emailShowDig=true即可

本站 为真实数据项目
后端代码，请访问 https://github.com/cgq001/admin-node2.0  

前台展示代码，请访问： https://github.com/cgq001/admin-nodebooks2.0-pc

####  滚动插件：vue-happy-scroll
#####  1、JS
```javascript
import Vue from 'vue'
import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
```
#####  2、HTML
```html
<happy-scroll color="rgba(0,0,0,0.5)" size="5">
    <div>
        <p></p> 
        <p></p> 
        <p></p> 
    </div>
</happy-scroll>
```
