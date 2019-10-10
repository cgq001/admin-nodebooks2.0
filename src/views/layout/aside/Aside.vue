<template>
    <div class="aside">
            <div class="aside-logo">
                <i v-if="asideShow" class="el-icon-s-home"></i>
                <span v-else>老崔云笔记</span>
            </div>
            <div class="aside-menu">
                <happy-scroll class="aside-menu-scroll" color="rgba(0,0,0,0.5)" size="10">
                <el-menu :collapse-transition='false' 
                    :default-active="active" 
                    class="el-menu-vertical-demo nav-list" 
                    :router="true"
                    :collapse="asideShow"
                    background-color="#001529"
                    text-color="#A6ADB4"
                    >
                    <el-menu-item index="/">
                        <i class="iconfont icon-shouye"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1" class="nav-list">
                        <template slot="title">
                        <i class="iconfont icon-wenzhang-copy"></i>
                            <span slot="title">文章管理</span>
                        </template>
                        <el-menu-item index="/writing">编辑文章</el-menu-item>
                        <el-menu-item index="/draft">草稿箱</el-menu-item>
                        <el-menu-item index="/articlelist">文章列表</el-menu-item>  
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="iconfont icon-biaoqian"></i>
                            <span slot="title">标记管理</span>
                        </template>
                        <el-menu-item index="/label">标签管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="iconfont icon-shiyongshouce"></i>
                            <span slot="title">手册管理</span>
                        </template>
                        <el-menu-item index="/manual">手册列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="iconfont icon-message"></i>
                            <span slot="title">留言管理</span>
                        </template>
                        <el-menu-item index="/msglist">留言列表</el-menu-item>
                        <el-menu-item index="/msgexamine">审核列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/project">
                        <i class="iconfont icon-02"></i>
                        <span slot="title">项目管理</span>
                    </el-menu-item>
                    <el-submenu index="6">
                        <template slot="title">
                        <i class="iconfont icon-shezhi1"></i>
                            <span slot="title">设置</span>
                        </template>
                        <el-menu-item index="/resume">个人经历</el-menu-item>
                        <el-menu-item index="/adminuser">后端用户管理</el-menu-item>
                    </el-submenu>
                </el-menu>
                </happy-scroll>
            </div>
    </div>
</template>

<script>
export default {
    props: {
        asideShow:{
            type:Boolean,
            required:true
        }
    },
    data() {
      return {
          routerli:''
      };
    },
    methods: {

    },
    computed:{
        active:function(){
            return this.$route.path;
        }
    },
    watch:{

    },
    created(){
        // console.log(this.$route.path)
    }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.aside{
    padding-bottom: 20px;
    box-sizing: border-box;
}
.aside-logo{
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    color: #ffffff;
    border-bottom: 1px solid #ffffff;
    box-sizing: border-box;
}
.nav-list .is-active{
    color: #ffffff!important;
    background: #1890FF!important;
}
.aside-menu{
    width: 100%;
    height: calc(100% - 60px);
}
.aside-menu-scroll{
    width: 100%;
    height: 100%;
}
.nav-list i{
    margin-right: 10px;
}
</style>