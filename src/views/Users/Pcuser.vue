<template>
    <!-- 前台用户管理 -->
    <div class="admin">
            <div class="searchs">
                <el-input v-model.trim="pageList.name" placeholder="请输入用户昵称" @change="searchChange"></el-input>
            </div>
            <!-- 用户列表 -->
                <el-table
                    :data="dateList"
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="头像"
                    >
                        <template slot-scope="scope">
                          
                            <div class="imgsbox">
                                <img v-if="scope.row.imgs" :src="scope.row.imgs" />
                                <img v-else src="../../assets/imgs/logo.jpg" />
                            </div>
                           
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="昵称">
                    </el-table-column>
                    <el-table-column
                    label="类型"
                    >
                        <template slot-scope="scope">
                            {{scope.row.weight == 2 ? 'GitHub用户' : '注册用户'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="邮箱"
                    >
                        <template slot-scope="scope">
                            {{scope.row.email ? scope.row.email : '无'}}
                        </template>
                    </el-table-column>
                    <el-table-column
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
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                </el-table>
                <!-- 分页 -->
                 <Page :total='total' :pageSize='pageList.rows' @changePages='changePages' />
    </div>
</template>

<script>
import Page from '../layout/pages/Page'
export default {
    data(){
        return {
            pageList:{
                page: 1,
                rows: 1,
                name: null
            },
            dateList:[],
            total:0
        }
    },
    methods:{
        infoCreated:function(){
            this.$http.get('getPcUserList',{
                params:{
                    ...this.pageList
                }
            })
            .then(res=>{
                if(res.data.code == 0){
                    this.dateList=res.data.data
                    this.total=res.data.total
                }
            })
        },
        handleDelete:function(index,rows){
            this.$http.post('deletePcUsers',{
                _id:rows._id
            })
            .then(res=>{
                if(res.data.code == 0){
                     this.dateList.splice(index,1)
                }
            })
            .catch(err=>{

            })
        },
        changePages:function(val){
            this.pageList.page=val
            this.infoCreated()
            
        },
        searchChange(){
           
            if(this.pageList.name == ''){
                this.pageList.name = null
            }
            this.pageList.page = 1
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
.imgsbox,.imgsbox img{
    width: 35px;
    height: 35px;
}
.searchs{
    width: 300px;
    margin: 10px 15px;
}
</style>