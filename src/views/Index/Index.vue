<template>
    <!-- 首页  -->
    <div class="index">
        <el-tabs type="border-card" class="index-box">
            <el-tab-pane label="用户数据分析">
                <Users />
            </el-tab-pane>
            <el-tab-pane label="文章数据分析">
                <Adduser />
            </el-tab-pane>
            <el-tab-pane label="技能展示">
                <Skill />
            </el-tab-pane>
            <el-tab-pane label="健康指南">
                <Healthy />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Users from './views/user'
import Adduser from './views/Adduser'
import Healthy from './views/Healthy'
import Skill from './views/Skill'
export default {
    components:{
        Users,
        Adduser,
        Healthy,
        Skill
    }
}
</script>

<style scoped>
.index{
    width: 100%;
    height: 100%;
}
.index-box{
    width: 100%;
    height: 100%;
}
</style>