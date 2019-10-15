<template>
    <!-- 头部 -->
    <div class="header">
            <!-- 左侧 -->
            <div class="header-icon" @click="targetIcon">
                <i :class="asideShow ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            </div>
            <!-- 右侧 -->
            <div class="header-title">
                    <div class="block"><el-avatar shape="square" :size="40" :src="user.imgs? user.imgs : squareUrl"></el-avatar></div>
                    <el-dropdown click="header-title-list"  @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" :split-button='true'>
                            <el-dropdown-item icon="iconfont icon-bi" command="1">发布文章</el-dropdown-item>
                            <el-dropdown-item icon="iconfont icon-tupian" divided command="5">修该头像</el-dropdown-item>
                            <el-dropdown-item icon="iconfont icon-yonghuming" command="6">修该昵称</el-dropdown-item>
                            <el-dropdown-item icon="iconfont icon-mima" divided command="2">修该密码</el-dropdown-item>
                            <el-dropdown-item icon="iconfont icon-youxiang" command="3">修该邮箱</el-dropdown-item>
                            <el-dropdown-item icon="iconfont icon-icon-" divided command="4">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
            </div>
            <!-- 绑定邮箱 -->
            <el-dialog title="绑定邮箱" 
                        :visible.sync="emailShow" 
                         center 
                        :show-close='emailShowDig' 
                        :close-on-click-modal='emailShowDig' 
                        :close-on-press-escape='emailShowDig'>
                    <Email  @successEmail='successEmail' />
            </el-dialog>
            <!-- 修改秘密 -->
            <el-dialog title="修改密码" :visible.sync="passwordShow" center >
                    <Password @classPass='classPass' :user='user'/>
            </el-dialog>
            <!-- 修该昵称 -->
             <el-dialog title="修改昵称" :visible.sync="nameShow" center >
                    <Names @closeNames='closeNames' :user='user'/>
            </el-dialog>
             <!-- 修该头像 -->
             <el-dialog title="修改头像" :visible.sync="ImgsShow" center >
                    <Imgs @closeImgs='closeImgs' :user='user'/>
            </el-dialog>
    </div>
</template>

<script>
import { clearInterval, setInterval, setTimeout } from 'timers';
import Email from './Email'
import Password from './Password'
import Names from './names'
import Imgs from './Imgs'
import imgUre from '../../../assets/imgs/logo.jpg'
//['asideShow']
export default {
    props: {
        asideShow:{
            type:Boolean,
            required:true,
        }
    },

    data(){
        return {
            squareUrl:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            emailFormWidth:'120px',
            emailShow:false,  //是够显示  邮箱 弹出层
            passwordShow: false , //是否显示 修改秘密
            emailShowDig: true,  
            nameShow: false,
            ImgsShow:false
            // user:{
            //     name:'',
            //     imgs:''
            // }
        }
    },
    methods:{
        closeImgs:function(){
            this. ImgsShow=false
        },
        closeNames:function(){
            this.nameShow=false
        },
        classPass:function(){
            this.passwordShow=false
        },
        successEmail:function(){
          //  console.log('邮箱呀')
            this.emailShowDig=true
            this.emailShow=false
        },
        targetIcon:function(){
           this.$emit('targetIcon',!this.asideShow)
        },
        handleCommand:function(command){
            //
            switch (command){
                case '1':
                    this.$router.push('/writing')
                break;
                case '2': 
                   this.passwordShow=true
                break;
                case '3':
                   this.emailShow=true
                break;
                case '4':
                    this.$store.commit('removeToken')
                break;
                case '5':
                    
                     this.$confirm('为节省空间，本站不支持上传图片，可使用图片连接', '提示', {
                            confirmButtonText: '知道了',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                           this.ImgsShow=true
                        }).catch(() => {
                            this.$emit('closeImgs')
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });
                break;
                case "6":
                    this.nameShow=true
                
                    
            }
        } 
    },
    computed:{
        user:function(){
            return this.$store.state.user
        }
    },
    watch:{
        'user.email':{
            handler:function(news,olds){
                
                if(!news){
                   // console.log('123') show-close
                    this.emailShow=true
                    this.emailShowDig=false  //强制不存在邮箱的输入邮箱
                    // this.emailShowDig=true //不强制不存在邮箱的输入邮箱
                }else{
                   
                     this.emailShowDig=true
                    this.emailShow=false
                }
            },
            deep: true,
            immediate: true
        }
    },
    components:{
        Email,
        Password,
        Names,
        Imgs
    },
    created:function(){
      //  let token=this.$store.state.token 
      //  console.log(token)
      this.$http.get('/getUser')
                .then(res=>{
                   // console.log(res.data)
                    if(res.data.code == 0){
                       // this.user=res.data.data
                        this.$store.commit('setUser',res.data.data)
                        console.log(this.user.imgs)
                    }
                })
                .catch(err=>{
                   // console.log('过期啦')
                    this.$store.commit('removeToken')
                })
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-icon{
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    font-size: 26px;
}
.header-title{
    display: flex;
    align-items: center;
}
.block{
    margin-right: 10px;
}
.el-dropdown-link{
    cursor: pointer;
}
</style>