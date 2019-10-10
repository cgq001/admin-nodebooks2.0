<template>
    <!-- 修改邮箱-->
        <div>
                <el-form :model="emailForm" :rules="emailFormRules" ref="emailForm">
                    <el-form-item label="邮箱地址" :label-width="emailFormWidth" prop="urls">
                        <el-input v-model="emailForm.urls" autocomplete="off" @change="changeEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码"  :label-width="emailFormWidth" prop="numbers">
                        <el-col :span="11">
                            <el-input v-model="emailForm.numbers" :placeholder="emailForm.numbersTexts"  :suffix-icon="numbersShow? 'el-icon-check' : '' "></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                             <el-button v-show="!numbersShow" type="success" @click="getNumbers"  :disabled='emailForm.startNumber'>{{emailForm.numbersTexts}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="emaliSubmit('emailForm')" :disabled='!numbersShow'>确 定</el-button>
                </div>
        </div>
</template>
<script>
let TimeInsert=null
export default {
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
                urls:'',
                numbers:'',
                startNumber:false,
                numbersTexts:'获取验证码'
            },
            emailFormRules:{
                urls:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur' }
                ],
                numbers:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' },
                    {validator: validatePass, trigger: 'blur'}
                ]
            },
            numbers:6666666,
            numbersShow: false,  //验证码正确
             emailFormWidth:'120px',
        }
    },
    methods:{
         getNumbers:function(){
            let This=this
            
            if(!this.emailForm.urls){
                this.$alert('请输入邮箱', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                     }
                    });
            }else{
                 let res= /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                    
                    if(res.test(this.emailForm.urls)){
                        let numbers=parseInt(Math.random()*100000)
                        this.$http.post('/setUserEmail',{
                            emails:this.emailForm.urls,
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
                      
                    }else{
                        this.$alert('请输入正确的邮箱地址', '温馨提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                            });
                    }
            }
               
                
        },
        emaliSubmit:function(formName){
            this.startNumber=false
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('/setUserEmailOnes',{
                        _id:this.$store.state.user._id,
                        email:this.emailForm.urls
                    })
                    .then(res=>{
                        if(res.data.code == 0){
                            this.$store.commit('setEmails',this.emailForm.urls)
                           // console.log(res.data)
                            this.$emit('successEmail')
                             this.emailForm.numbers=''
                            this.emailForm.numbersTexts='获取验证码'
                            this.emailForm.startNumber=false
                            this.numbersShow=false
                            clearInterval(TimeInsert)
                        }
                    })
                    .catch(err=>{

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