import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Indexs/Index.vue'),
      children:[
        {
          path:'/',   //首页
          name: 'index',
          component: ()=> import('./views/Index/Index.vue')
        },
        {
          path:'/writing',  //编辑器
          name: 'writing',
          component: ()=> import('./views/Writing/Writing.vue')
        },
        {
          path: '/draft',  //草稿箱
          name: 'draft',
          component: ()=> import('./views/Draft/Drafts.vue')
        },
        {
          path: '/label',  //标签页
          name: 'label',
          component: ()=> import('./views/Label/LabelList.vue')
        },
        {
          path: '/articlelist', //文章列表页
          name: 'articlelist',
          component: ()=>import('./views/Article/ArticleList.vue')
        },
        {
          path: '/manual',   //手册管理
          name: 'manual',
          component: ()=>import('./views/Manual/Manual.vue')
        },
        {
          path: '/project',  //项目管理
          name: 'project',
          component: ()=>import('./views/project/Project.vue')
        },
        {
          path: '/resume' ,  //个人经历
          name: 'resume',
          component: ()=>import('./views/Resume/Resume.vue')
        },
        {
          path: '/reception',  //网站设置
          name: 'reception',
          component: ()=>import("./views/Resume/Reception.vue")
        },
        {
          path: '/adminuser' ,  //后端用户管理
          name: 'adminuser',
          component: ()=>import('./views/Users/Adminuser.vue')
        },
        {
          path: '/pcuser' ,  //前台用户管理
          name: 'adminuser',
          component: ()=>import('./views/Users/Pcuser.vue')
        },
        {
          path: '/msgexamine',   //用户留言列表
          name: 'msgexamine',
          component: ()=>import('./views/message/msgexamine.vue')
        },
        {
          path: 'msglist',   //用户留言审核列表
          name: 'msglist',
          component: ()=>import('./views/message/msglist.vue')
        }
      ]
    },
    {
      path: '/load', //登录页
      name: 'load',
      component: () => import('./views/Load/Load.vue')
    },
    {
      path: '/register', //注册
      name: 'register',
      component: () => import('./views/Register/Registers.vue')
    }
  ]
})
