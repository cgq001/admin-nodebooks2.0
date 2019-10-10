<template>
<!-- 标签页 -->
    <div class="label-list">
        <!-- 搜索框 -->
        <div class="label-list-search">
            <el-form :inline="true" :model="lebeText" class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input v-model="lebeText.name" placeholder="请输入标签名称" @change="changeText"></el-input>
                </el-form-item>
                <el-button type="primary" @click="addLabelBtn">新增标签</el-button>
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
                    label="标签名称"
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
                    <el-table-column label="标签状态" width="200">
                        <template slot-scope="scope">
                            <el-button
                            v-if="scope.row.show"
                            size="mini"
                            type="primary"
                            @click="handleShows(scope.$index, scope.row)">显示</el-button>
                            <el-button
                            v-else
                            size="mini"
                            type="danger"
                            @click="handleShows(scope.$index, scope.row)">不显示</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
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
        <!-- 新增 或者 修该 标签 编辑区域 -->
        <el-dialog :title="lebelTypes == 1 ? '新增标签' : '编辑标签'" :visible.sync="labelShow" :center="true">
            <el-form :model="labelForm" :rules="labelRules" ref="labelForm">
                <el-form-item label="便签名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="labelForm.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="labelShow = false">取 消</el-button>
                <el-button type="primary" @click="labelSubmit('labelForm')">确 定</el-button>
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
                page: 1,
                rows: 6
            },
            total:0, //总页码
            labelShow:false,  //是否显示 弹出层
            labelForm:{  //编辑 或者 新增
                name:'',
                _id: ''
            },
            labelRules:{
                name:[
                        { required: true, message: '请输入标签名称', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                ]
            },
            formLabelWidth:'120px',
            tabelLists:[   //标签列表
                {
                    id: '1',
                    name: 'vue',
                    date: '2019-8-12 15:30:39'
                }
            ],
            lebelTypes: 1  //1 为 新增标签  2 为 编辑标签  
        }
    },
    methods:{
        addLabelBtn:function(){  //新增便签 按钮
            this.labelShow=true
            this.lebelTypes=1
            this.labelForm.name=''
            this.labelForm._id=''
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
                                this.$http.post('deleteLabel',{
                                    _id:rows._id
                                })
                                .then(res=>{
                                    if(res.data.code==0){
                                        This.tabelLists.splice(index,1) 
                                    }
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
                       this.$http.post('addlabel',{
                           ...this.labelForm
                       })
                       .then(res=>{
                           //console.log(res.data)
                           if(res.data.code == 0){
                               this.tabelLists.push(res.data.data.data)
                               this.labelShow=false
                           }
                       })
                       .catch(err=>{
                           //console.log(err)
                       })
                   }else if(this.lebelTypes == 2){
                       this.$http.post('addlabel',{
                           ...this.labelForm
                       })
                       .then(res=>{
                           let tabelLists= this.tabelLists
                           for(let i=0; i<tabelLists.length;i++){
                               if(tabelLists[i]._id == res.data.data.data._id){
                                   tabelLists[i].name =res.data.data.data.name
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
                this.$http.get('searchLabel',{
                    params:{...this.lebeText}
                })
                .then(res=>{
                            // console.log(res)
                            if(res.data.code == 0){
                                this.tabelLists=res.data.data
                                this.total=res.data.total
                            }
                })
               .catch(err=>{
                           // console.log(err)
                        })
        },
        changeText:function(){  //模糊查询
            this.lebeText.page=1
            this.createdList()
        },
        changePages:function(val){  //点击分页
          
            this.lebeText.page=val
             this.createdList()
        },
        handleShows:function(index,rows){
            console.log(index)
            this.tabelLists[index].show =!this.tabelLists[index].show
             this.$http.post('target',{
                _id:rows._id
            })
            .then(res=>{
                if(res.data.code == 1){
                    console.log(res.data.data)
                }
            })
        }
    },
    created:function(){
        this.createdList()
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
</style>