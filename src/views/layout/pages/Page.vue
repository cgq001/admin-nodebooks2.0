<template>
    <!-- 分页 -->
    <div class="pages">
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change='changePages'
            :total="total"
            :page-size='pageSize'>
        </el-pagination>
    </div>
    
</template>

<script>
export default {
    props:{
        total:Number,
        pageSize:Number
    },
    methods:{
        changePages:function(val){
            this.$emit('changePages',val)
        }
    }
}
</script>

<style scoped>
.pages{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>