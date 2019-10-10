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
                            <!-- <img :src="scope.row.imgage" style="width:30px;height:30px" /> -->
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[],
            pageList:{
                page: 1,
                rows: 1
            }
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
                    console.log(this.list)
                }
            })
        },
        handleAgree(){

        },
        handleRefuse(){

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
       
    }
}
</script>

<style scoped>

</style>