<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
            <el-input v-model="ruleForm.name" :placeholder="user.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即修该</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props:['user'],
    data(){
        return {
            ruleForm:{
                name:''
            },
            rules:{
               name:[
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
               ]
            }
        }
    },
    methods:{
        submitForm:function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   this.$http.post('/setUserNamedOnes',{
                       _id:this.user._id,
                       name: this.ruleForm.name
                   })
                   .then(res=>{
                       if(res.data.code == 0){
                           this.$store.commit('setNames',this.ruleForm.name)
                           this.ruleForm.name=''
                           this.$emit('closeNames')
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