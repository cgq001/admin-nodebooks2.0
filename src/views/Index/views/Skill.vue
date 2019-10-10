<template>
<!-- 技能展示 -->
    <div class="users">
        <!-- 实时访问量 -->
        <div class="usere-realtime">
            <div class="usere-realtime-title">前端技能展示</div>
            <ve-pie  :data="chartData" :settings="chartSettings" width='500px'></ve-pie>
        </div>
         <!-- 用户分布图 -->
        <div class="usere-realtime">
           
            
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        level: [
          ['HTML', 'CSS', 'JavaScript'],
          ['Vue', '小程序','React','Express']
        ]
      }
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': 'HTML', '访问用户': 30 },
            { '日期': 'CSS', '访问用户': 35 },
            { '日期': 'JavaScript', '访问用户': 40 },
            { '日期': 'Vue', '访问用户': 40 },
            { '日期': '小程序', '访问用户': 20 },
            { '日期': 'React', '访问用户': 12 },
            { '日期': 'Express', '访问用户': 28 }
          ]
        }
      }
    }
  }
</script>


<style scoped>
.users{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.usere-realtime{
    width: 45%;
    height: 100%;
    min-width: 500px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #D2D2D2;
}
.ve-line{
  width: 100%;
  height: 400px;
}
.usere-realtime-title{
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  color: #12BEFC;
}
</style>