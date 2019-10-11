<template>
    <!-- 留言审核列表 -->
    <div class="examine">
        <!-- 查询结果 -->
            <el-table
                :data="list"
                border
                style="width: 100%">
                <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                label="头像"
                width="80">
                    <template slot-scope="scope">
                            <el-image 
                            v-if="scope.row.imgage"
                                style="width: 50px; height: 50px"
                                src="scope.row.imgage" 
                                >
                            </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                label="留言时间"
                width="120">
                    <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ moment(scope.row.data).format('YYYY-MM-DD') }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="昵称"
                width="120">
                </el-table-column>
                <el-table-column
                prop="username"
                width="120"
                label="用户名">
                </el-table-column>
                <el-table-column
                prop="value"
                label="留言内容">
                </el-table-column>
                <el-table-column
                width="100"
                label="用户类型">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.type | types }}</span>
                        </template>
                </el-table-column>
                <el-table-column 
                  label="操作"
                  width="160">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleRefuse(scope.$index, scope.row)">拒绝</el-button>
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
        return{
            list:[],
            pageList:{
                page: 1,
                rows: 1
            },
            total:0
        }
    },
    created(){
        this.info()
    },
    methods:{
        info(){
            this.$http.get('searchMsg',{
                params:{
                     ...this.pageList
                }
            })
            .then(res=>{
                if(res.data.code === 0){
                    this.list=res.data.data
                    this.total=res.data.total
                }
            })
        },
        handleAgree(index,row){
            this.$http.post('setStateMsg',{
                _id:row._id,
                state: 1
            })
            .then(res=>{
                if(res.data.code === 0){
                    this.list.splice(index,1)
                }
            })   
        },
        handleRefuse(index,row){
            this.$http.post('setStateMsg',{
                _id:row._id,
                state: 2
            })
            .then(res=>{
                if(res.data.code === 0){
                    this.list.splice(index,1)
                }
            })  
        },
        changePages(val){
            this.pageList.page=val
            this.info()
        }
    },
    filters:{
        types(value){
            if(value == 1){
                return "注册用户"
            }else{
                return "GitHub用户"
            }
        }
       
    },
    components:{
        Page
    }
}
</script>

<style scoped>

</style>