<template>
<!-- 文章列表页 -->
    <div class="label-list">
        <!-- 搜索区域 -->
        <div class="label-list-search">
            <el-form :inline="true" :model="lebeText" class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input v-model="lebeText.name" placeholder="请输入文章名称" @change="textChangetxt"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select
                        class="label"
                        v-model="lebeText.label"
                        filterable
                        default-first-option
                        @change="textChangeLab"
                        placeholder="请选择文章标签">
                    <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <!-- 列表 -->
        <div class="label-list-lists">
                  <el-table
                    :data="tabelLists"
                    stripe
                    style="width: 100%">
                     <el-table-column
                        type="index"
                        width="50"
                        fixed
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="文章名称"
                        fixed
                    >
                    </el-table-column>
                    <el-table-column
                    prop="introduction"
                    label="文章简介"
                    >
                    </el-table-column>
                    <el-table-column
                    label="文章标签"
                    >
                        <template slot-scope="scope">
                            <el-tag class="taglist" v-for="(item,index) in scope.row.tableName" :key='index' :type="index%2 == 1 ? 'info': 'success'">{{item}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="分类"
                    width="80"
                    >
                        <template slot-scope="scope">
                            <el-button
                            v-if="scope.row.class == 1"
                            size="mini"
                            type="success"
                            @click="classEdit(scope.$index, scope.row)">文章</el-button>
                            <el-button
                            v-else-if="scope.row.class == 2"
                            size="mini"
                            type="primary"
                            @click="classEdit(scope.$index, scope.row)">手册</el-button>
                            <el-button
                            v-else
                            size="mini"
                            type="info"
                            @click="classEdit(scope.$index, scope.row)">关于</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="创建时间"
                    width="160"
                    >
                        <template slot-scope="scope">
                            {{moment(scope.row.data).format('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
                    <el-table-column label="权重" width="100">
                        <template slot-scope="scope">
                            <el-button
                            v-if="scope.row.weight == 100"
                            size="mini"
                            type="danger"
                            @click="handleTopMin(scope.$index, scope.row)">取消置顶</el-button>
                            <el-button
                            v-else
                            size="mini"
                            type="primary"
                            @click="handleTopMax(scope.$index, scope.row)">置顶</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="400" fixed="right">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="success"
                            @click="handleShow(scope.$index, scope.row)">预览</el-button>
                            <el-button
                            size="mini"
                            type="info"
                            @click="titleEdit(scope.$index, scope.row)">编辑标题</el-button>
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑内容</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </div>
        <!-- 分页 -->
        <Page :total='total' :pageSize='lebeText.rows' @changePages='changePages' />
        <!-- 修该 文章 编辑区域 -->
        <el-dialog title="文章编辑" :visible.sync="labelShow" :center="true">
            <el-form :model="labelForm" :rules="labelRules" ref="labelForm">
                <el-form-item label="文章名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="labelForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文章简介" :label-width="formLabelWidth" prop="introduction">
                    <el-input v-model="labelForm.introduction" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="贴个便签" :label-width="formLabelWidth" prop="label">
                    <el-select
                                class="label"
                                v-model="labelForm.label"
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
                <el-form-item label="权重" :label-width="formLabelWidth" prop="weight">
                    <el-slider v-model="labelForm.weight" show-input :min='1' :max='100'></el-slider>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="labelShow = false">取 消</el-button>
                <el-button type="primary" @click="labelSubmit('labelForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 预览 -->
        <el-dialog :title="textShowTxt.name" :visible.sync="textShows">
            <div id="main">
                <mavon-editor :toolbarsFlag='false' :defaultOpen='preview' :subfield='false' :boxShadow='false' :ishljs='true' v-model="textShowTxt.text"/>
            </div>
        </el-dialog>
        <!-- 分类 -->
        <el-dialog title="编辑文章分类" :visible.sync="classFormShow">
            <el-form :model="classForm" :rules="classFormRules" ref="classForm">
                <el-form-item label="文章分类" :label-width="formLabelWidth" prop="class">
                    <el-select v-model="classForm.class" placeholder="请选择文章分类">
                        <el-option label="文章" :value="1"></el-option>
                        <el-option label="手册" :value="2"></el-option>
                         <el-option label="关于" :value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="classFormShow = false">取 消</el-button>
                <el-button type="primary" @click="classFormSubmit('classForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Page from '../layout/pages/Page'
export default {
    data(){
        return {
            lebeText:{  //搜索
                name:'',
                label:'',
                page: 1,
                rows: 2
            },
            labelShow:false,  //是否显示 弹出层
            labelForm:{  //编辑 
                name:'',
                introduction:'',
                label:'',
                weight:''
            },
            labelRules:{
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
                weight:[
                     { required: true, message: '请选择权重', trigger: 'blur' }
                ]
            },
            formLabelWidth:'120px',
            tabelLists:[
                {
                    id: '1',
                    name: 'vue',
                    date: '2019-8-12 15:30:39'
                }
            ],
            options: [],
            total: 0,
            textShows:false  ,//是否预览
            preview:'preview',
            textShowTxt:{
                name: '',
                text: ''
            } , //展示内容
            classForm:{  //分类
                class:'',
                _id:0,
                index:0
            },
            classFormRules:{
                class:[
                     {  required: true, message: '请选择分类', trigger: 'change' }
                ]
            },
            classFormShow:false
            
        }
    },
    methods:{
        addLabelBtn:function(){
           
        },
        handleEdit:function(index,rows){  //编辑内容
            this.$router.push('/writing?uid='+rows._id)
        },
        handleTopMin:function(index,rows){  //取消置顶
                this.$http.post('textMin',{
                    _id:rows._id
                })
                .then(res=>{
                    if(res.data.code == 0){
                        this.tabelLists[index].weight=1
                    }
                })
                .catch(err=>{

                })
        },
        handleTopMax:function(index,rows){  //置顶
                this.$http.post('textMax',{
                    _id:rows._id
                })
                .then(res=>{
                    if(res.data.code == 0){
                        this.tabelLists[index].weight=100
                    }
                })
                .catch(err=>{

                })
        },
        classEdit:function(index,rows){       //分类
                this.classFormShow=true
                this.classForm.class=rows.class
                this.classForm._id=rows._id
                 this.classForm.index=index
        },
        classFormSubmit:function(formName){  //分类确认按钮
                     this.$refs[formName].validate((valid) => {
                            if (valid) {
                                    this.$http.post('textClass',{
                                        _id:this.classForm._id,
                                        class:this.classForm.class
                                    })
                                    .then(res=>{
                                        if(res.data.code == 0){
                                            this.tabelLists[this.classForm.index].class=this.classForm.class
                                            this.classFormShow=false
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
        handleDelete:function(index,rows){  //删除按钮
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post('deleteText',{
                            _id:rows._id
                        })
                        .then(res=>{
                                        this.tabelLists.splice(index,1)
                                    })
                                    .catch(err=>{

                                    })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });

        },
        handleShow:function(index,rows){  //预览
                this.$http.get('tetxShows',{
                    params:{
                        _id:rows._id
                    }
                })
                .then(res=>{
                        this.textShows=true
                        this.textShowTxt.name=res.data.data.name
                        this.textShowTxt.text=res.data.data.text
                })
                .catch(err=>{

                })
                
        },
        titleEdit:function(index,rows){  //编辑 标题
                this.labelShow=true
                this.labelForm=JSON.parse(JSON.stringify(rows))
        },
        labelSubmit:function(formName){   //编辑 弹层 确认按钮
            this.$refs[formName].validate((valid) => {
                    if (valid) {
                       
                    // console.log(this.labelForm)
                     this.$http.post('updataTextLabel',{
                         ...this.labelForm
                     })
                     .then(res=>{
                        let tabelLists=this.tabelLists
                        for(let i=0; i<tabelLists.length;i++){
                            if(tabelLists[i]._id == this.labelForm._id){
                                tabelLists[i].name = this.labelForm.name
                                tabelLists[i].introduction = this.labelForm.introduction

                                tabelLists[i].label = JSON.parse(JSON.stringify(this.labelForm.label))
                                tabelLists[i].tableName=[]
                                 for(let k=0;k<tabelLists[i].label.length;k++){
                                    for(let j=0;j<this.options.length;j++){
                                    
                                            if(tabelLists[i].label[k] == this.options[j]._id){
                                                tabelLists[i].tableName.push(this.options[j].name) 
                                            }
                                        }
                                        
                                    }

                                tabelLists[i].weight = this.labelForm.weight
                            }
                        }
                        this.tabelLists=tabelLists
                        this.labelShow = false
                       // this.total=res.data.total
                     })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
        },
        createdList:function(){
            this.$http.get('searchTextList',{
                params:{
                    ...this.lebeText
                }
            })
            .then(res=>{
                if(res.data.code == 0){
                   // this.tabelLists=res.data.data
                     let listLI=res.data.data  
               
                        for(let i=0; i<listLI.length;i++){
                            
                            listLI[i].tableName=[]
                            for(let k=0;k<listLI[i].label.length;k++){
                                for(let j=0;j<this.options.length;j++){
                                    
                                    if(listLI[i].label[k] == this.options[j]._id){
                                        listLI[i].tableName.push(this.options[j].name) 
                                    }
                                }
                                
                            }
                        }   
                        this.tabelLists=listLI
                        this.total=res.data.total
                }
            })
        },
        textChangetxt:function(){  //内容搜索
            this.lebeText.page=1
            this.lebeText.label=''
             this.createdList()
        },
        textChangeLab:function(){   //标签搜索
            this.lebeText.page=1
             this.lebeText.name=''
             this.createdList()
        },
        changePages:function(val){  //分页
            this.lebeText.page=val
             this.createdList()
        }
    },
  async created(){

        let dataOption= await this.$http.get('searchAllLabel')
        let dateList =await this.$http.get('searchTextList',{
                                    params:{
                                        ...this.lebeText
                                    }
                                })
                 this.options = dataOption.data.data  
        let listLI=dateList.data.data  
               
            for(let i=0; i<listLI.length;i++){
                
                listLI[i].tableName=[]
                for(let k=0;k<listLI[i].label.length;k++){
                    for(let j=0;j<dataOption.data.data.length;j++){
                        
                        if(listLI[i].label[k] == dataOption.data.data[j]._id){
                            listLI[i].tableName.push(dataOption.data.data[j].name) 
                        }
                    }
                    
                }
            }   
            this.tabelLists=listLI
             this.total=dateList.data.total
    },
    components:{
        Page
    }
}
</script>

<style scoped>
.label-list{
    padding: 10px;
}
.label-list-search{
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
}
.taglist{
    margin-right: 5px;
}
</style>