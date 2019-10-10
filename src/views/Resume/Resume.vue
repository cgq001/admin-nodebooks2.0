<template>
<!-- 经历 -->
    <div class="label-list">
        <!-- 搜索框 -->
        <div class="label-list-search">
            <el-form :inline="true" class="demo-form-inline">
                <el-button type="primary" @click="addLabelBtn">添加经历</el-button>
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
                        label="序号">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="经历名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="introduction"
                    label="经历简介"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="weight"
                    label="排序"
                     sortable
                    >
                    </el-table-column>
                    <el-table-column
                    label="起始时间"
                    >
                        <template slot-scope="scope">
                            {{scope.row.dataList[0] | Upper}}&nbsp;&nbsp;至&nbsp;&nbsp;{{scope.row.dataList[1] | Upper}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="创建时间"
                    >
                        <template slot-scope="scope">
                            {{moment(scope.row.data).format('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <!-- 新增 或者 编辑 项目 -->
        <el-dialog :title="addProOff?'新增经历' : '修该经历'" :visible.sync="projectAddShow">
            <el-form :model="projectAdd" :rules="projectRules" ref="projectAdd">
                <el-form-item label="经历名称" :label-width="projectAddWidth" prop="name">
                    <el-input v-model="projectAdd.name" autocomplete="off" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="经历简介" :label-width="projectAddWidth" prop="introduction">
                    <el-input v-model="projectAdd.introduction" autocomplete="off" placeholder="请输入项目简介"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="projectAddWidth" prop="weight">
                     <el-slider v-model="projectAdd.weight" show-input></el-slider>
                </el-form-item>
                <el-form-item label="起始时间" :label-width="projectAddWidth" prop="dataList">
                     <el-date-picker
                            v-model="projectAdd.dataList"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="projectAddShow = false">取 消</el-button>
                <el-button type="primary" @click="projectSubmit('projectAdd')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import Page from '../layout/pages/Page' 
import moment from 'moment'
export default {
    data(){
        return {
            lebeText:{
                page: 1,
                rows: 3
            },
            projectAddShow: false,
            projectAdd:{
                name:'',
                introduction:'',
                weight:0,
                dataList:''
            },
            projectRules:{
                name:[
                     { required: true, message: '请输入项目名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }        
                ],
                introduction:[
                     { required: true, message: '请输入项目简介', trigger: 'blur' },
                    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }        
                ],
                weight:[
                     { required: true, message: '请选择排序值', trigger: 'blur' }      
                ],
                dataList:[
                     { required: true, message: '请选择起始时间', trigger: 'blur' }        
                ]
            },
            projectAddWidth: '120px',
            tabelLists:[],
            total:0,
            addProOff: true  //是否是新增
        }
    },
    methods:{
        changePages:function(val){
            this.lebeText.page=val
            this.infoCreated()
        },
        addLabelBtn:function(){  //添加项目
            this.projectAddShow=true
            this.addProOff=true
            this.projectAdd.name=''
            this.projectAdd.introduction=''
            this.projectAdd.weight=0
            this.projectAdd.dataList=''
        },
        projectSubmit(formName){  // 弹出层 确认按钮

             this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.addProOff){
                        // console.log(this.projectAdd)
                            this.$http.post('addResume',{
                                ...this.projectAdd
                            })
                            .then(res=>{
                                if(res.data.code == 0){
                                    this.tabelLists.push(res.data.data)
                                    this.projectAddShow=false
                                }
                                
                            })
                            .catch(err=>{

                            })
                    }else{
                           this.$http.post('addResume',{
                                ...this.projectAdd
                            })
                            .then(res=>{
                                if(res.data.code == 0){
                                    //this.tabelLists.push(res.data.data)
                                    this.projectAddShow=false
                                    let tabelLists=this.tabelLists
                                    for(let i=0;i<tabelLists.length;i++){
                                        if(tabelLists[i]._id == this.projectAdd._id){
                                            tabelLists[i].name = this.projectAdd.name
                                             tabelLists[i].introduction = this.projectAdd.introduction
                                              tabelLists[i].urlname = this.projectAdd.urlname
                                               tabelLists[i].github = this.projectAdd.github
                                                tabelLists[i].icons = this.projectAdd.icons
                                        }
                                    }
                                    this.tabelLists=tabelLists
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
        handleEdit:function(index,rows){  //编辑
                this.projectAddShow=true
                this.addProOff=false
                this.projectAdd=JSON.parse(JSON.stringify(rows))
        },
        handleDelete:function(index,rows){  //删除
                 this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http.post('deleteResume',{
                                _id:rows._id
                            })
                            .then(res=>{
                                if(res.data.code == 0){
                                     this.tabelLists.splice(index,1)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });
        },
        infoCreated:function(){   //初始化数据
            this.$http.get('searchResume',{
                params:{
                    ...this.lebeText
                }
            })
            .then(res=>{
                if(res.data.code == 0){
                    console.log(res.data.data)
                        this.tabelLists=res.data.data
                        this.total=res.data.total
                }
            })
            .catch(err=>{

            })
        }
    },
    components:{
        Page
    },
    created(){
        this.infoCreated()
    },
    filters: {
　　　　Upper: function (value) {
　　　　　　return moment(value).format('YYYY-MM-DD')
　　　　}
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
    padding-bottom: 10px;
}

</style>