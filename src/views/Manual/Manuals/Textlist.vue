<template>
<!-- 添加手册文章 -->
    <div class="textlist">
        <!-- 搜索 -->
        <div class="tetxlist-search">
            <el-form :inline="true" :model="textSearch" class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input v-model="textSearch.name" placeholder="请输入文章标题" @change="textChangs"></el-input>
                </el-form-item>
            </el-form>
        </div>
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
                            size="mini"
                            :disabled="scope.row.types"
                            @click="handleEdit(scope.$index, scope.row)">添加到手册</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </div>
        <!-- 分页 -->
        <Page :total='total' :pageSize='textSearch.rows' @changePages='changePages' />
    </div>
</template>

<script>
import Page from '../../layout/pages/Page'
export default {
    props:['tetxManualId','textManualLists'],
    data(){
        return {
            textSearch:{
                page: 1,
                rows: 2,
                name:''
            },
            textList:[],
            total:0
        }
    },
    methods:{
        handleEdit(index,rows){  //添加到手册
     
            this.$http.post('addTextMan',{
                _id:this.tetxManualId,
                name:rows
            })
            .then(res=>{
                if(res.data.code == 0){
                    this.textList.splice(index,1)
                    this.$emit('showTops')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        infoCreated(){  //初始化数据
            
             this.$http.get('searchTextListManual',{
                    params:{
                        ...this.textSearch
                    }
                })
                .then(res=>{
                    if(res.data.code == 0){
                        let str=res.data.data
                        let textManualLists=this.textManualLists
                        for(let i=0;i<str.length;i++){
                            str[i].types=false
                            for(let k=0;k<textManualLists.length;k++){
                                if(str[i]._id == textManualLists[k]._id){
                                     str[i].types=true
                                }
                            }
                        }
                      
                        this.textList=str
                        this.total=res.data.total
                    }
                })
        },
        changePages(val){
            this.textSearch.page=val
            this.infoCreated()
        },
        textChangs(){
            this.textSearch.page=1
            this.infoCreated()
        }
    },
    created:function(){
       
       this.infoCreated()
    },
    components:{
        Page
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