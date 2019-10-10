<template>
<!-- 手册 -->
    <div class="label-list">
        <!-- 搜索框 -->
        <div class="label-list-search">
            <el-form :inline="true" :model="lebeText" class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input v-model="lebeText.name" placeholder="请输入手册名称" @change="changeText"></el-input>
                </el-form-item>
                <el-button type="primary" @click="addLabelBtn">新增手册</el-button>
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
                    label="封面"
                    >
                         <template slot-scope="scope">
                             <div class="imgbox">
                                 <img :src="scope.row.imgs" />
                             </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="手册名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="introduction"
                    label="手册简介"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="创建时间"
                    >
                        <template slot-scope="scope">
                            {{moment(scope.row.data).format('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="350">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handleAdds(scope.$index, scope.row)">添加文章</el-button>
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handleUpdate(scope.$index, scope.row)">编辑手册内容</el-button>
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
        <!-- 新增 或者 修该 标签 编辑区域 -->
        <el-dialog :title="lebelTypes == 1 ? '新增手册' : '编辑手册'" :visible.sync="labelShow" :center="true">
            <el-form :model="labelForm" :rules="labelRules" ref="labelForm">
                <el-form-item label="手册名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="labelForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="封面(Url)" :label-width="formLabelWidth" prop="imgs">
                    <el-input v-model="labelForm.imgs" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="introduction">
                    <el-input v-model="labelForm.introduction" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="labelShow = false">取 消</el-button>
                <el-button type="primary" @click="labelSubmit('labelForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加文章 -->
        <el-dialog title="添加文章" :visible.sync="textListShow" width="70%">
            <Textlist :tetxManualId='tetxManualId' :textManualLists='textManualLists' @showTops='showTops' />
        </el-dialog>
        <!-- 编辑手册内容 -->
        <el-dialog title="编辑手册文章列表" :visible.sync="ManuallistShow" width="70%">
            <Manuallist :ManuallistShowId='ManuallistShowId'  />
        </el-dialog>
    </div>
</template>

<script>
import Page from '../layout/pages/Page' 
import Textlist from './Manuals/Textlist'
import Manuallist from './Manuals/Manuallists'
export default {
    data(){
        return {
            lebeText:{  //搜索
                name:'',
                page: 1,
                rows: 6
            },
            total:0, //总页码
            labelShow:false,  //是否显示 弹出层
            labelForm:{  //编辑 或者 新增
                name:'',
                _id: '',
                introduction:'',
                imgs:''
            },
            labelRules:{
                name:[
                        { required: true, message: '请输入手册名称', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                ],
                introduction:[
                        { required: true, message: '请输入手册简介', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
                imgs:[
                        { required: true, message: '请输入手册封面', trigger: 'blur' },
                        { min: 2, message: '最少输入两个字符', trigger: 'blur' }
                ],
            },
            formLabelWidth:'120px',
            tabelLists:[   //标签列表
                {
                    id: '1',
                    name: 'vue',
                    date: '2019-8-12 15:30:39'
                }
            ],
            lebelTypes: 1 , //1 为 新增标签  2 为 编辑标签  
            textListShow:false,  //添加文章
            tetxManualId: 0   ,//添加手册的ID
            textManualLists: [],  //
            ManuallistShow: false  , //编辑文章列表
            ManuallistShowId: 0  //编辑文章列表的手册ID
        }
    },
    methods:{
        handleUpdate:function(index,rows){   //编辑手册的文章列表
                this.ManuallistShow=true
                this.ManuallistShowId=rows._id
        },
        showTops:function(){   //添加 文章 弹出层 自定义事件
             this.textListShow=false
        },
        handleAdds:function(index,rows){  //添加文章
                this.textListShow=true
                this.tetxManualId=rows._id
                this.textManualLists=rows.list

        },
        addLabelBtn:function(){  //新增便签 按钮
            this.labelShow=true
            this.lebelTypes=1
            this.labelForm.name=''
            this.labelForm._id=''
            this.labelForm.introduction=''
            this.labelForm.imgs=''
        },
        handleEdit:function(index,rows){  //编辑标签 按钮
            this.lebelTypes=2
            this.labelShow=true
            this.labelForm={...rows}
        },
         
        handleDelete:function(index,rows){
            let This=this
                      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.$http.post('deleteManualname',{
                                    _id:rows._id
                                })
                                .then(res=>{
                                        This.tabelLists.splice(index,1) 
                                    
                                })
                                  
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                });          
                            });
                        
        },
        labelSubmit:function(formName){   //便签弹层  确认按钮
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   if(this.lebelTypes == 1){
                       this.$http.post('addManual',{
                           ...this.labelForm
                       })
                       .then(res=>{
                           console.log(res.data)
                           if(res.data.code == 0){
                               this.tabelLists.push(res.data.data)
                               this.labelShow=false
                           }
                       })
                       .catch(err=>{
                           //console.log(err)
                       })
                  }else if(this.lebelTypes == 2){
                       this.$http.post('addManual',{
                           ...this.labelForm
                       })
                       .then(res=>{
                           let tabelLists= this.tabelLists
                           for(let i=0; i<tabelLists.length;i++){
                               if(tabelLists[i]._id == res.data.data._id){
                                   tabelLists[i].name =res.data.data.name
                                   tabelLists[i].imgs =res.data.data.imgs
                                   tabelLists[i].introduction =res.data.data.introduction
                               }
                           }
                           this.tabelLists=tabelLists
                           this.labelShow=false
                       })
                       .catch(err=>{
                          // console.log(err)
                       })
                  }
                } else {
                   // console.log('error submit!!');
                    return false;
                }
            });
        },
        createdList:function(){  //查询
                this.$http.get('searchManual',{
                    params:{...this.lebeText}
                })
                .then(res=>{
                          //  console.log(res)
                            if(res.data.code == 0){
                                this.tabelLists=res.data.data
                                this.total=res.data.total
                            }
                })
               .catch(err=>{
                            console.log(err)
                        })
        },
        changeText:function(){  //模糊查询
            this.lebeText.page=1
            this.createdList()
        },
        changePages:function(val){  //点击分页
          
            this.lebeText.page=val
             this.createdList()
        }
    },
    created:function(){
        this.createdList()
    },
    components:{
        Page,
        Textlist,
        Manuallist
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
.imgbox,.imgbox img{
    width: 50px;
    height: 50px;
}

</style>