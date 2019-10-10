<template>
    <!-- 后端用户管理 -->
    <div class="admin">
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
                            {{scope.row.weight == 2 ? '管理员' : '测试号'}}
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
                rows: 1
            },
            dateList:[],
            total:0
        }
    },
    methods:{
        infoCreated:function(){
            this.$http.get('getUserList',{
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
            this.$http.post('deleteUsers',{
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
</style>