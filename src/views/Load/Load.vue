<template>
<!-- 登录页 -->
    <div class="load" @mouseup="swiprUp"  @mousemove="swiprMousemove" >
         <div class="load-title">
                    老崔云笔记
        </div>
        <div class="load-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                
                <el-form-item prop="user">
                    <el-input v-model="ruleForm.user" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" prefix-icon="el-icon-unlock" placeholder="请输入密码"></el-input>
                </el-form-item>
                <div class="swipe" v-if="!winOffs" v-show="!offRulse">
                    <!-- 底层滑块 -->
                    <div class="swipr-box" :class="offRulse? 'swiprShow' : ''">
                           <div class="swipr-box-list">请按住滑块，移动到最右侧</div>     
                    </div>
                    <div class="swipr-swipr" :style="{ left: left+'px' }"
                        @mousedown="swiprDown">
                        <i class="el-icon-d-arrow-right"></i>
                    </div>
                </div>
                <div class="foot">
                    <el-checkbox v-model="ruleForm.checked">七天免登陆</el-checkbox>
                    <el-link type="danger" @click="passwordBtns" class="forgetPassword">忘记密码？</el-link>
                    <el-link type="primary" class="forgetPassword" href='/register' v-if="adminoffs">没有账号？现在去注册</el-link>
                </div>
                <el-form-item>
                    <el-button :disabled='!offRulse'  class="submits" type="primary" @click="submitForm('ruleForm')">立即登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 忘记密码 -->
        <el-dialog title="忘记密码" :visible.sync="passwordShow">
            <Relesepass @closePass='closePass' />
        </el-dialog>
    </div>
</template>

<script>
import Relesepass from './relesePass'
export default {
    data(){
        return {
            ruleForm:{
                user: '',
                password: '',
                checked: false
            },
            rules:{
                user:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            },
            left:'0', //滑块实时位置
            cursor:false,  //鼠标是否按下
            leftNumber:0,  //按下时 横坐标位置
            widths:0 , //  可滑动范围
            offRulse:true , //是否验证成功
            winOffs: false  , //判断是否是手机
            passwordShow:false,
            adminoffs:false
        }
    },
    methods:{
        closePass:function(){
            this. passwordShow=false
        },
        passwordBtns:function(){
            this.passwordShow=true
        },
        submitForm:function(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('searchUser',{
                        ...this.ruleForm
                    })
                    .then(res=>{
                        if(res.data.code == 0){
                          //  console.log(res.data.data)
                           this.$store.commit('addToken',res.data.data)
                           this.$router.push('/')
                           if(this.ruleForm.checked){
                                window.sessionStorage.setItem('token',res.data.data)
                           }else{
                               
                                window.localStorage.setItem('token',res.data.data)
                           }
                           
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        swiprMousemove:function(e){

           if(this.cursor){
         //   console.log(e.pageX)
                let Number=e.pageX - this.leftNumber
               
                if(Number>0 && Number<= this.widths-5){
                    this.left=Number
                }else if(Number>this.widths-5 && Number<= this.widths){
                   
                    if(!this.offRulse){
                        this.left=this.widths
                        this.offRulse=true
                        this.$message({
                            message: '验证成功',
                            type: 'success'
                        });
                    }
                    
                }
           }
        },
        swiprUp:function(e){
            this.cursor=false
            if(!this.offRulse){
                 this.left=0;
            }
      //      console.log(this.cursor)

        },
        swiprDown:function(e){
            if(!this.offRulse){
                this.cursor=true
              //  console.log(this.cursor)
                this.leftNumber=e.pageX
                let swiprBox = document.querySelector('.swipr-box')
                let swiprSwipr =document.querySelector('.swipr-swipr')

                this.widths=swiprBox.offsetWidth - swiprSwipr.offsetWidth
            }
            
            
        }
    },
    mounted:function(){
               //平台、设备和操作系统
        var system = {
            win: false,
            mac: false,
            xll: false,
            ipad:false
        };
        //检测平台
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
        //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
        if (system.win || system.mac) {
           // console.log('这是电脑')
            this.winOffs=false
        } else {
            this.offRulse=true
           // console.log('这是手机')
            this.winOffs=true
        }
    },
    created:function(){
        let user=this.$route.query.user
        if(user){
            this.ruleForm.user=user
        }

        this.$http.get('searchSetAdmins')
            .then(res=>{
               
                if(res.data.code === 0){
                    this.adminoffs=res.data.data.adminoffs
                }
            })
    },
    components:{
        Relesepass
    }
}
</script>

<style scoped>
.load{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F6F6F6;
}
.load-box{
    width: 400px;
}
.submits{
    width: 100%;
}
.foot{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.load-title{
    width: 100%;
    height: 50px;
    background: #1890FF;
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    margin-bottom: 10px;
    position: absolute;
    left: 0;
    top: 0;
}
.swipe{
    width: 100%;
    height: 30px;
    position: relative;
    margin-bottom: 10px;
    border: 1px solid #C8C8C8;
}
.swipr-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    background: #F1F1F1;
    color: #969798;
    z-index: 1;
    -webkit-touch-callout: none; 
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none;
    user-select: none; 
    position: relative;
}
.swiprShow{
    background: #67C23A;
    color: #ffffff;
    border: 1px solid #67C23A;
}
.swipr-box-list{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-clip:text;
    z-index: 2;
    animation: swiprText 3s  linear infinite alternate;
}

.swipr-swipr{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 50px;
    z-index: 2;
    background: #ffffff;
    text-align: center;
    line-height: 30px;
    color: #C9C9C9;
    cursor: move;  
}
.swipr-swipr i{
    animation: swipr 2s  linear infinite normal;
}
@keyframes swipr {
    0%{
       transform: translateX(-10px)
    }
    50%{
        transform: translateX(0px)
    }
    100%{
        transform: translateX(10px)
    }
}
@keyframes swiprBox {
    0%{
       transform: translateX(-100px)
    }
    100%{
        transform: translateX(300px)
    }
}
@keyframes swiprText {
    0%{
       transform: scale(0.9)
    }
    100%{
        transform: scale(1.1)
    }
}
.forgetPassword{
    -webkit-touch-callout: none; 
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none;
    user-select: none; 
    position: relative;
}

</style>