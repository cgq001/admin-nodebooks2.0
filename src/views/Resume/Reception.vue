<template>
    <!-- 网站设置 -->
    <div class="Reception">
        <el-button v-if="infoShow" type="primary" @click="infoBtns">网站初始化</el-button>
        <div v-else>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    前台左侧头像
                </div>
                <div class="Reception-box-center">
                    {{list.imgs}}
                </div>
                <div class="Reception-box-right">
                    <el-button type="primary" size="small" @click="undataSet('imgs')">修该</el-button>
                </div>
            </div>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    GitHub地址
                </div>
                <div class="Reception-box-center">
                    {{list.github}}
                </div>
                <div class="Reception-box-right">
                    <el-button type="primary" size="small" @click="undataSet('github')">修该</el-button>
                </div>
            </div>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    掘金地址
                </div>
                <div class="Reception-box-center">
                    {{list.juejin}}
                </div>
                <div class="Reception-box-right">
                    <el-button type="primary" size="small" @click="undataSet('juejin')">修该</el-button>
                </div>
            </div>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    留言回复名称
                </div>
                <div class="Reception-box-center">
                    {{list.name}}
                </div>
                <div class="Reception-box-right">
                    <el-button type="primary" size="small" @click="undataSet('name')">修该</el-button>
                </div>
            </div>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    留言回复头像
                </div>
                <div class="Reception-box-center">
                    {{list.nameimgs}}
                </div>
                <div class="Reception-box-right">
                    <el-button type="primary" size="small" @click="undataSet('nameimgs')">修该</el-button>
                </div>
            </div>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    业务邮箱地址
                </div>
                <div class="Reception-box-center">
                    {{list.eamils}}
                </div>
                <div class="Reception-box-right">
                    <el-button type="primary" size="small" @click="undataSet('eamils')">修该</el-button>
                </div>
            </div>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    业务邮箱密钥
                </div>
                <div class="Reception-box-center">
                    
                </div>
                <div class="Reception-box-right">
                    <el-button type="primary" size="small" @click="updataSetPass">修该</el-button>
                </div>
            </div>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    是否开启留言功能
                </div>
                <div class="Reception-box-center">
                
                </div>
                <div class="Reception-box-right">
                    <el-switch
                        v-model="list.msgoffs"
                        active-color="#13ce66"
                        @change="undataSet('msgoffs')"
                        inactive-color="#ff4949">
                    </el-switch>
                </div>
            </div>
            <div class="Reception-box">
                <div class="Reception-box-left">
                    是否开启后台注册功能
                </div>
                <div class="Reception-box-center">
                
                </div>
                <div class="Reception-box-right">
                    <el-switch
                        v-model="list.adminoffs"
                        active-color="#13ce66"
                        @change="undataSet('adminoffs')"
                        inactive-color="#ff4949">
                    </el-switch>
                </div>
            </div>
        </div>
        
        <!-- 网站初始化 -->
        <el-dialog  v-if="infoShow" title="网站初始化" :visible.sync="infoOffs">
            <el-form :model="form" :rules="formRules" ref="forms">
                <el-form-item label="前台左侧头像" :label-width="formLabelWidth" prop="imgs">
                    <el-input v-model="form.imgs" autocomplete="off"></el-input>
                </el-form-item>
               <el-form-item label="GitHub地址" :label-width="formLabelWidth" prop="github">
                    <el-input v-model="form.github" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="掘金地址" :label-width="formLabelWidth" prop="juejin">
                    <el-input v-model="form.juejin" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="回复留言名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="回复留言头像" :label-width="formLabelWidth" prop="nameimgs">
                    <el-input v-model="form.nameimgs" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="业务邮箱" :label-width="formLabelWidth" prop="eamils">
                    <el-input v-model="form.eamils" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="业务邮箱密钥" :label-width="formLabelWidth" prop="emailpassword">
                    <el-input v-model="form.emailpassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否开启留言功能" :label-width="formLabelWidth">
                    <el-switch v-model="form.msgoffs" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
                <el-form-item label="是否开启后端注册" :label-width="formLabelWidth">
                    <el-switch v-model="form.adminoffs" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="infoSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: true,
            infoShow: false,
            infoOffs:false,
            form:{
                msgoffs:true,
                adminoffs:true
            },
            formRules:{
                imgs:[
                    { required: true, message: '请输入前台展示左侧图片', trigger: 'change' }
                ],
                github:[
                    { required: true, message: '请输入GitHub地址', trigger: 'change' }
                ],
                juejin:[
                    { required: true, message: '请输入掘金地址', trigger: 'change' }
                ],
                name:[
                    { required: true, message: '请输入回复留言名称', trigger: 'change' }
                ],
                nameimgs:[
                    { required: true, message: '请输入回复留言头像', trigger: 'change' }
                ],
                emailpassword:[
                    { required: true, message: '请输入业务邮箱密钥', trigger: 'change' }
                ],
                eamils:[
                    { required: true, message: '请输入业务邮箱', trigger: 'change' }
                ]
            },
            formLabelWidth: '150px',
            list:{}
        }
    },
    created(){
        this.info()
    },
    methods:{
        info(){
            this.$http.get('searchSetAll')
                .then(res=>{
                    console.log(res.data.data)
                    if(res.data.data){
                        this.list=res.data.data
                    }else{
                        
                        this.infoShow=true
                    }

                    
                })
        },
        infoBtns(){
            this.infoOffs=true
        },
        infoSubmit(){
            this.$refs['forms'].validate((valid) => {
                if (valid) {
                   this.$http.post('setSets',{
                       ...this.form
                   })
                        .then(res=>{
                            if(res.data.code === 0){
                                this.list=res.data.data
                                this.$refs['forms'].resetFields();
                                this.infoShow=false
                                this.infoOffs=false
                            }
                           
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                    }
                });
        },
        undataSet(names){
            
            if(names === 'adminoffs' || names === 'msgoffs' ){
                this.$http.post('undataSetAll',{
                            ...this.list
                        })
                        .then(res=>{
                            if(res.data.code === 4){
                                this.info()
                            }
                        })
            }else{
                this.$prompt('请输入要修该的内容', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({ value }) => {
                        this.list[names]=value
                        this.$http.post('undataSetAll',{
                            ...this.list
                        })
                        .then(res=>{
                            if(res.data.code === 4){
                                this.info()
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });       
                    });
            }
            
        },
        updataSetPass(){
            this.$prompt('请输入邮箱密钥', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
                }).then(({ value }) => {
                    this.$http.post('undataSetPass',{
                            emailpassword:value,
                            _id:this.list._id
                        })
                        .then(res=>{
                            
                        })

                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
                });
        }
    }
}
</script>

<style scoped>
.Reception{
    width: 100%;
    height: 100%;
    padding: 20px 10px;
}
.Reception-box{
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 64px;
    line-height: 64px;
    padding: 0 20px;
    box-sizing: border-box;
}
.Reception-box-left{
    width: 180px;
    height: 100%;
    font-size: 16px;
    font-weight: 600;
}
.Reception-box-center{
    flex: 1;
}
.Reception-box-right{
    width: 180px;
    height: 100%;
}
</style>