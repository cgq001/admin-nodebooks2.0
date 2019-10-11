<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="图片地址" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
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
          var validatePass = (rule, value, callback) => {
            //   let res=/^https?:\/\/.*?(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/i
            
                let res = /^[a-zA-Z0-9_-]{4}$/
                if (res.test(value)) {
                    callback(new Error('请输入正确的的图片格式'));
                } else {
              
                    callback();
                }
            }
        return {
            ruleForm:{
                name:''
            },
            rules:{
               name:[
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                     { validator: validatePass, trigger: 'blur' }
               ]
            }
        }
    },
    methods:{
        submitForm:function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   this.$http.post('/setUserImgsOnes',{
                       _id:this.user._id,
                       name: this.ruleForm.name
                   })
                   .then(res=>{
                       if(res.data.code == 0){
                           this.$store.commit('setImgs',this.ruleForm.name)
                           this.ruleForm.name=''
                           this.$emit('closeImgs')
                       }
                   })
                    // this.$alert('抱歉，暂不开放本功能', '温馨提示', {
                    //     confirmButtonText: '确定',
                    //     callback: action => {
                    //         this.$emit('closeImgs')
                    //         this.$message({
                    //         type: 'info',
                    //         message: `已取消`
                    //         });
                    //     }
                    //     });
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        }
    },
    created:function(){
               
    }
}
</script>

<style scoped>

</style>