<template>
    <!-- 修改密码-->
        <div>
                <el-form :model="emailForm" :rules="emailFormRules" ref="emailForm">
                    <el-form-item label="新密码" :label-width="emailFormWidth" prop="password" >
                        <el-input v-model="emailForm.password" autocomplete="off" @change="changeEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="emailFormWidth"  >
                        <el-input v-model="user.email" autocomplete="off" @change="changeEmail" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码"  :label-width="emailFormWidth" prop="numbers">
                        <el-col :span="11">
                            <el-input v-model="emailForm.numbers" :placeholder="emailForm.numbersTexts" :suffix-icon="numbersShow? 'el-icon-check' : '' "></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                             <el-button v-show="!numbersShow" type="success" @click="getNumbers"  :disabled='emailForm.startNumber'>{{emailForm.numbersTexts}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="emaliSubmit('emailForm')" :disabled='!numbersShow' >确 定</el-button>
                </div>
        </div>
</template>
<script>
let TimeInsert=null
export default {
    props:['user'],
    data(){
         var validatePass = (rule, value, callback) => {
                if (value == this.numbers) {
                     callback();
                     this.numbersShow=true
                    } else {
                
                    callback(new Error('验证码错误'));
                     this.numbersShow=false
                    }
        };
        return {
            emailForm:{
                password:'',
                numbers:'',
                startNumber:false,
                numbersTexts:'获取验证码'
            },
            emailFormRules:{
                password:[
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                numbers:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' },
                    {validator: validatePass, trigger: 'blur'}
                ]
            },
             emailFormWidth:'120px',
             numbersShow:false , //是否验证通过
             numbers: 0 //验证码
        }
    },
    methods:{
         getNumbers:function(){
            let This=this

            let numbers=parseInt(Math.random()*100000)
                this.$http.post('/songEmalis',{
                    emails:this.user.email,
                    numbers:numbers
                })
                .then(res=>{
                    if(res.data.code == 0){
                          this.numbers=numbers
                           clearInterval(TimeInsert)
            
                        let num=90
                                    let emailForm=This.emailForm
                                        emailForm.startNumber=true
                                        emailForm.numbersTexts='还有'+num+'s后过期'
                                        this.emailForm=emailForm
                                        TimeInsert=setInterval(function(){
                                
                                num--
                                if(num>0){
                                
                                    let emailForm=This.emailForm
                                        emailForm.startNumber=true
                                        emailForm.numbersTexts='还有'+num+'s后过期'
                                        this.emailForm=emailForm
                                }else{
                                    clearInterval(TimeInsert)
                                
                                    let emailForm=This.emailForm
                                        emailForm.startNumber=false
                                        emailForm.numbersTexts='重新获取验证码'
                                        this.emailForm=emailForm
                                }
                                
                            },1000) 
                    }
                })
                .catch(err=>{

                })
             
                
        },
        emaliSubmit:function(formName){
            this.startNumber=false
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   this.$http.post('/setUserPasswordOnes',{
                       _id:this.user._id,
                       password:this.emailForm.password
                   })
                   .then(res=>{
                       if(res.data.code == 0){
                           this.$emit('classPass')
                           this.emailForm.numbers=''
                            this.emailForm.numbersTexts='获取验证码'
                            this.emailForm.startNumber=false
                            this.numbersShow=false
                            clearInterval(TimeInsert)
                       }
                   })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        changeEmail:function(){
            this.emailForm.numbers=''
            this.emailForm.numbersTexts='获取验证码'
            this.emailForm.startNumber=false
            this.numbersShow=false
            clearInterval(TimeInsert)
        }
    },
    created:function(){
        console.log(this.user)
    },
    computed:{

    }
}
</script>

<style scoped>
.dialog-footer{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.dialog-footer .el-button{
    width: 30%;
}
</style>