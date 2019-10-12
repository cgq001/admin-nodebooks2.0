<template>
<!-- 健康指南 -->
    <div class="users">
        <!-- 实时访问量 -->
        <div class="usere-realtime">
            <div class="usere-realtime-title">七日运动步数</div>
            <ve-line :data="userData"  :setting="userSettings" width='500px'></ve-line>
        </div>
         <!-- 用户分布图 -->
        <div class="usere-realtime">
            <div class="usere-realtime-title">今日运动</div>
             <ve-gauge :data="chartData" :settings="chartSettings" width='500px'></ve-gauge>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
         this.userSettings = {   //用户访问量
          xAxisType: 'time'
        }
      this.chartSettings = {
        dataName: {
          'speed': '今日运动'
        },
        seriesMap: {
          'speed': {
            min: 0,
            max: 10000
          }
        }
      }
      return {
        userData: {  //用户访问量 数据
            columns: ['日期', '步数'],
            rows: [
              { '日期': '周一', '步数': 6393 },
              { '日期': '周二', '步数': 3530 },
              { '日期': '周三', '步数': 2923 },
              { '日期': '周四', '步数': 7723 },
              { '日期': '周五', '步数': 3792 },
              { '日期': '周六', '步数': 4593 },
              { '日期': '周日', '步数': 1593 }
            ],
          },
          chartData: {
            columns: ['type', 'value'],
            rows: [
                { type: 'speed', value: 6357 }
            ]
            }
        }
      },
    methods:{
        rounds:function(min,max){
            return parseInt((Math.random()*(max-min))+min) 
        }
    },
    mounted:function(){
        let data= new Date()
        let Time=data.getTime()
        let r=86400000

        let m=data.getMonth()+1
        let day=data.getDate()
        let userDataRows=[]
        for(let i=0;i<7;i++){
            let str={}
              str['日期']=this.moment(Time-i*r).format("MM/DD")
              str['步数']=this.rounds(1170,9960)
              userDataRows.push(str)
        }
         this.userData.rows=userDataRows
         this.chartData.rows[0].value=userDataRows[userDataRows.length-1]['步数']
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