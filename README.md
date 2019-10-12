# admin-pc(博客2.0版本)

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

### Run your tests
```
yarn run test
```
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
