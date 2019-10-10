<template>
<!-- 编辑页面 -->
    <div class="writing">
         <!-- 功能按钮 -->
         <div class="writing-can">
                <el-button type="info" @click="draftForm('textForms')" :disabled='!offSubmit'>保存草稿</el-button>
                <el-button type="success" @click="submitForm('textForms')" :disabled='!offSubmit'>{{uid? '更新文章' : '发布文章'}}</el-button>
         </div>
         <!-- 内容操作区 -->
         <div class="writing-content" ref="textsBox">
                <el-form :model="textForm" :rules="textRules" ref="textForms" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="文章标题" prop="name">
                            <el-input v-model="textForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="文章简介" prop="introduction">
                            <el-input type="textarea" v-model="textForm.introduction"></el-input>
                        </el-form-item>
                        <el-form-item label="贴个标签" prop="label" class="texts">
                           <el-select
                                class="label"
                                v-model="textForm.label"
                                multiple
                                filterable
                                :multiple-limit='5'
                                default-first-option
                                placeholder="请选择文章标签">
                                <el-option
                                v-for="item in options"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="tetxs" label="文章内容" prop="text">
                                <Markdown :textTxt='texts' @addMark='addMarks'/>
                        </el-form-item>
                </el-form>
         </div>
    </div>
</template>

<script>
import Markdown from './Markdown/Markdown'
export default {
    data(){
        return {
            textForm:{
                name:'',
                introduction:'',
                label:[],
                text:'',
                show:false
            },
            texts:'',
            textRules:{
                name:[
                    { required: true, message: '请输入文章名称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符之间', trigger: 'blur' }
                ],
                introduction:[
                    { required: true, message: '请输入文章简介', trigger: 'blur' },
                    { min: 10, max: 150, message: '长度在 10 到 150 个字符之间', trigger: 'blur' }
                ],
                label:[
                    { type: 'array', required: true, message: '请至少选择一个文章标签', trigger: 'change' }
                ],
                text:[
                    { required: true, message: '请输入文章内容', trigger: 'blur' },
                    { min: 2,  message: '最少输入2个字符', trigger: 'blur' }
                ]
            },
            options: [],
            offSubmit:false  ,//文章是否已经修该
            uid:null
        }
    },
    methods:{
        // 发布文章
        submitForm:function(formName){
                this.textForm.show=true
                 this.$refs[formName].validate((valid) => {
                    if (valid) {
                       if(this.uid){
                            this.$http.post('updataTexts',{
                                ...this.textForm
                            })
                            .then(res=>{
                                if(res.data.code == 0){
                                    this.offSubmit=false
                                    this.$router.go(-1)
                                }
                            })
                       }else{
                           this.$http.post('addTexts',{
                            ...this.textForm
                            })
                            .then(res=>{
                                if(res.data.code == 0){
                                    this.textForm.name=''
                                    this.textForm.introduction=''
                                    this.textForm.label=[]
                                    this.textForm.text='' 
                                    this.offSubmit=false  
                                     this.texts=''
                                }
                            })
                            .catch(err=>{

                            })
                       }
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    });
        },
        // 保存草稿
        draftForm:function(formName){
            this.textForm.show=false
            this.$refs[formName].validate((valid) => {
                    if (valid) {
                       if(this.uid){
                           this.$http.post('updataTexts',{
                                ...this.textForm
                            })
                            .then(res=>{
                                if(res.data.code == 0){
                                    this.offSubmit=false
                                    this.$router.go(-1)
                                }
                            })
                       }else{
                           this.$http.post('addTexts',{
                                ...this.textForm
                            })
                            .then(res=>{
                                if(res.data.code == 0){
                                    this.textForm.name=''
                                    this.textForm.introduction=''
                                    this.textForm.label=[]
                                    this.textForm.text='' 
                                    this.offSubmit=false  
                                     this.texts=''
                                }
                            })
                            .catch(err=>{

                            })
                       }
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
        },
        addMarks:function(txt){
            this.textForm.text=txt
        }
    },
    components:{
        Markdown
    },
    mounted:function(){
     
        
    },
    watch:{
        'textForm.text':{
            handler:function(news,olds){

                    if(news == olds){
                        this.offSubmit=false
                    }else{
                        this.offSubmit=true
                    }
            },
            deep:true
        }
    },
    created:function(){
        this.$http.get('searchAllLabel')
                    .then(res=>{
                        if(res.data.code == 0){
                           // console.log(res.data.data)
                            this.options = res.data.data
                        }
                        
                    })
        
        this.uid=this.$route.query.uid
        if(this.$route.query.uid){
                this.$http.get('tetxShows',{
                    params:{
                        _id:this.$route.query.uid
                    }
                })
                .then(res=>{
                //  console.log(res.data)
                    if(res.data.code == 0){
                        this.textForm=res.data.data
                        this.texts=res.data.data.text
                        this.offSubmit=false  
                    }
                })
        }
        
    },
    beforeRouteLeave(to,from,next){
        if(this.offSubmit){
            this.$confirm('你的文章还没有保存, 是否离开?', '提示', {
                    confirmButtonText: '离开',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                     next()    
                 return false;
                }).catch(() => {
                     next(from)   
            });
        }else{
             next()    
        }  
    },

}
</script>

<style scoped>
.writing{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
}
.writing-can{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
.label{
    width: 100%;
}
.tetxs{
    width: 100%;
    height: 500px;
    position: relative;
} 
.tetxs .aside-menu-scroll{
    width: 100%!important;
    height: 500px;
}
.tetxs .happy-scroll-content{
    width: 100%!important;
    height: 100%;
}
</style>