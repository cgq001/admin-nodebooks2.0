import axios from 'axios'

import store from './store'


import { Message,Loading } from 'element-ui';

let loading;
//开始动画
function startLoading(){
   // console.log('开始请求')
  
    loading=Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}
//结束动画
function endLoading(){
    //console.log('结束请求')
    loading.close()
}

let instance = axios.create({
    baseURL:   'http://127.0.0.1:5002/admin/', // 'https://api.caoxiaoyuan.cn/admin/'
    timeout: 5000
  });


instance.interceptors.request.use(config=>{
    if (store.state.isLogin && store.state.token) {
        config.headers = {
        Authorization: store.state.token,
        ...config.headers
        }
    }
   // console.log(config.headers)
    //加载动画
    startLoading()
   // console.log(config.method)
   
        return config
    
    
},error =>{
    return Promise.reject(error)
})


instance.interceptors.response.use(response=>{
    endLoading()
   
    if(response.data.code == 0 && response.data.msg){
        Message({
            message: response.data.msg,
            type: 'success'    
        })
    }else if(response.data.code == 1 && response.data.msg){
        Message({
            message: response.data.msg,
            type: 'warning'    
        })
    }else if(response.data.code == 4 && response.data.msg){
        Message({
            message: response.data.msg,
            type: 'error'    
        })
    }else if(response.data.code == 404 && response.data.msg){
        Message({
            message: response.data.msg,
            type: 'error'    
        })
        store.commit('removeToken')
    }
    return response;

},error =>{
   endLoading()
   return Promise.reject(error)
})
export default instance