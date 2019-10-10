<template>
    <div class="pass">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="user">
                <el-input v-model="ruleForm.user"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">找回密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            ruleForm:{
                name: '',
                user:''
            },
            rules:{
                name: [
                     { type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur' }
                ],
                user: [
                    {  required: true, message: '请输入用户名', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submitForm:function(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('/forgetPasswodf',{
                        emails:this.ruleForm.name,
                        user:this.ruleForm.user
                    })
                    .then(res=>{
                        if(res.data.code == 0){
                            this.$emit('closePass')
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        }
    }
}
</script>

<style scoped>

</style>