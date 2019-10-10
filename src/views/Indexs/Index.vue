<template>
<!-- 主页 -->
    <div class="indexs">
           <el-container>
               <!-- 侧边啦 -->
                <el-aside class="indexs-aside" :width="asideShow? '64px': '200px' ">
                        <Aside class="index-aside-menu"  :asideShow='asideShow' />
                </el-aside>
                <!-- 主要内容区 -->
                <el-container>
                    <!-- 头部 -->
                    <el-header class="indexs-header">
                        <Headers :asideShow='asideShow' @targetIcon='targetIcon' />
                    </el-header>
                    <!-- 内容区 -->
                    <el-main class="indexs-main">
                        <div class="indexs-main-content">
                            <transition mode="out-in">
                                <router-view />
                            </transition>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
    </div>
</template>
<script>
import Aside from '../layout/aside/Aside'
import Headers from '../layout/head/Header'
export default {
    data(){
        return {
            asideShow:false
        }
    },
    methods:{
        targetIcon:function(bloon){
            this.asideShow=bloon
        }
    },
    components:{
        Aside,
        Headers
    },
    created:function(){
        if(!this.$store.state.token){
            let token = sessionStorage.getItem('token') || localStorage.getItem('token')
                if(!token){
                    this.$router.push('/load')
                }else{
                    this.$store.commit('addToken',token)
                }
        }
    },
    computed:{
        isLogin:function(){
            return this.$store.state.isLogin
        }
    },
    watch:{
        isLogin:function(news,olds){
            if(!news){
                this.$router.push('/load')
                sessionStorage.removeItem('token')
                localStorage.removeItem('token')
            }
        }
    }
}
</script>

<style scoped>
.indexs{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.indexs > .el-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
}
.indexs-aside{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background: #001529;
}
.index-aside-menu{
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
    box-sizing: border-box;
}
.indexs-header{
    overflow: hidden;
}
.indexs-main{
    overflow: hidden;
    background: #E2E3E5;
    padding: 10px;
    box-sizing: border-box; 
    overflow: hidden;
}
.indexs-main-content{
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
}
.v-enter{
    transform: translateX(0)
}
.v-enter-to{
    transform: translateX(100%)
}
.v-leave-to{
    transform: translateX(0)
}
.v-leave{
    transform: translateX(100%)
}

.v-enter-active,.v-leave-active{
    transition:all 0.5s ease-in-out;
}
</style>