<template>
<!-- 编辑手册文章 -->
    <div class="textlist">
        <!-- 列表 -->
        <div class="textlist-list">
                  <el-table
                    :data="textList"
                    stripe
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        width="50"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="名称">
                    </el-table-column>
                    <el-table-column
                    prop="introduction"
                    label="简介">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            type="danger"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                            <el-button
                             size="mini"
                            @click="handleUpdata(scope.$index, scope.row)">编辑文章</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </div>
    </div>
</template>

<script>
import Page from '../../layout/pages/Page'
export default {
    props:['ManuallistShowId'],
    data(){
        return {
            textList:[],
            total:0
        }
    },
    methods:{
        handleUpdata(index,rows){
            this.$router.push('/writing?uid='+rows._id)
        },
        handleEdit(index,rows){  //添加到手册
                this.textList.splice(index,1)
            this.$http.post('deleteTextManListTxt',{
                _id:this.ManuallistShowId,
                list:this.textList
            })
            .then(res=>{
                if(res.data.code == 0){
                    
                    this.$emit('showTops')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        infoCreated(){  //初始化数据
            
             this.$http.get('searchManualLists',{
                    params:{
                       _id:this.ManuallistShowId
                    }
                })
                .then(res=>{
                    if(res.data.code == 0){
                     
                        this.textList=res.data.data.list
                      
                    }
                })
        }
    },
    created:function(){
       
       this.infoCreated()
    }
}
</script>

<style scoped>
.textlist{
    width: 100%;
    height: 100%;
}
.tetxlist-search{
    width: 100%;
    height: 60px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
}
.textlist-list{
     width: 100%;
}
</style>